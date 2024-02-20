// Set-up express server
import {dirname, join} from 'path'
import express, { Request, Response } from "express";
import {fileURLToPath} from "url";
const app = express();
import { exec } from 'child_process';
const SERVER_PORT = process.env.PORT || 21824;

// Set-up vue app
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, '../frontend')));

app.get('/wifi', (req: Request, res: Response) => {
    exec('nmcli --colors no -f SSID,BARS dev wifi list ifname wlan0', (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({'success': false, 'error': 'Failed to get wifi list'});
        }
        const wifiList = stdout.split('\n').map((line: string) => {
            const [ssid, bars] = line.split(' ').filter(Boolean);
            return { ssid, bars };
        });
        res.json(wifiList);
    });
});

app.get('/wifi/current', (req: Request, res: Response) => {
    exec('nmcli -t -f active,ssid dev wifi list ifname wlan0', (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({'success': false, 'error': 'Failed to get current wifi'});
        }
        const ssid = stdout.split('\n').find((line: string) => line.startsWith('yes:')).split(':')[1].trim();
        res.json({'ssid': ssid});
    });
});

app.post('/wifi/connect', (req: Request, res: Response) => {
    const { ssid, password } = req.body;
    exec(`nmcli dev wifi connect ${ssid} password ${password} ifname wlan0`, (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({'success': false, 'error': 'Failed to connect to wifi'});
        }
        res.json({'success': true});
    });
});

app.get('/vpn/status', (req: Request, res: Response) => {
    exec('nordvpn status', (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({'success': false, 'error': 'Failed to get VPN status'});
        }
        const status = stdout.split('\n').reduce((acc: any, line: string) => {
            const [key, value] = line.split(':');
            acc[key] = value.trim();
            return acc;
        }, {});
        res.json(status);
    });
});

app.post('/vpn/connect', (req: Request, res: Response) => {
    const { city } = req.body;
    exec(`nordvpn connect ${city}`, (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({'success': false, 'error': 'Failed to connect to VPN'});
        }
        res.json({'success': true});
    });
});

app.get('/vpn/disconnect', (req: Request, res: Response) => {
    exec('nordvpn disconnect', (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({'success': false, 'error': 'Failed to disconnect from VPN'});
        }
        res.json({'success': true});
    });
});

// Redirect all the other routes to Vue app
app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '../frontend/index.html'));
});

app.listen(SERVER_PORT, () => {
    console.log('Server running on port', SERVER_PORT);
});
