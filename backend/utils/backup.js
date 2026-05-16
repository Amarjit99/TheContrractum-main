const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const cron = require('node-cron');
const mongoose = require('mongoose');

// Models
const Certificate = require('../models/Certificate');
const IDCard = require('../models/IdCard');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const Settings = require('../models/Settings');

const backupDatabase = async () => {
    try {
        console.log('[Backup] Starting scheduled database backup...');
        
        const backupDir = path.join(__dirname, '..', 'backups');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const date = new Date().toISOString().replace(/:/g, '-').split('.')[0];
        const backupName = `db_backup_${date}`;
        const zipPath = path.join(backupDir, `${backupName}.zip`);

        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`[Backup] Successfully created backup archive: ${zipPath} (${archive.pointer()} total bytes)`);
        });

        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(output);

        // Export data
        const collections = [
            { name: 'certificates', model: Certificate },
            { name: 'idcards', model: IDCard },
            { name: 'users', model: User },
            { name: 'auditlogs', model: AuditLog },
            { name: 'settings', model: Settings }
        ];

        for (const col of collections) {
            const data = await col.model.find({});
            archive.append(JSON.stringify(data, null, 2), { name: `${col.name}.json` });
        }

        await archive.finalize();

    } catch (err) {
        console.error('[Backup] Scheduled backup failed:', err);
    }
};

const initializeBackupCron = () => {
    // Schedule backup for every Sunday at 2:00 AM
    cron.schedule('0 2 * * 0', () => {
        backupDatabase();
    });
    console.log('[System] Database auto-backup cron scheduled (Runs: Sunday at 02:00 AM)');
};

module.exports = { backupDatabase, initializeBackupCron };
