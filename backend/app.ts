// Set-up express server
import {dirname, join} from 'path'
import express, { Request, Response } from "express";
import {fileURLToPath} from "url";
const app = express();
import { exec } from 'child_process';
const SERVER_PORT = process.env.PORT || 80;

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set-up vue app
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, '../frontend')));

const INTERFACE_NAME_PUBLIC_WIFI = 'wlan0';
const INTERFACE_NAME_HOTSPOT = 'wlan1';


const parseWifiOutput = (output: string) => {
    const regex = /(.+)\s+([▂▄▆_]+)/g;
    let matches;
    const wifiData: {ssid: string, bars: string}[] = [];

    output.split('\n').forEach(function(line) {
        matches = regex.exec(line);
        if (matches !== null) {
            wifiData.push({
                ssid: matches[1].trim(),
                bars: matches[2].trim()
            });
        }
    });

    return wifiData;
}

app.get('/api/wifi/available', (req: Request, res: Response) => {
    try {
        exec(`nmcli --colors no -f SSID,BARS dev wifi list ifname ${INTERFACE_NAME_PUBLIC_WIFI}`, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({'success': false, 'error': 'Failed to get wifi available'});
            }
            const wifiList = parseWifiOutput(stdout);
            res.json(wifiList);
        });
    } catch (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({'success': false, 'error': 'Failed to get wifi available'});
    }

});

app.get('/api/wifi/current', (req: Request, res: Response) => {
    try {
        exec(`nmcli -t -f active,ssid dev wifi list ifname ${INTERFACE_NAME_PUBLIC_WIFI}`, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({'success': false, 'error': 'Failed to get current wifi'});
            }
            const ssid = stdout.split('\n').find((line: string) => line.startsWith('yes:'))?.split(':')[1]?.trim();
            res.json({'ssid': ssid});
        });
    } catch (e) {
        console.error(`exec error: ${e}`);
        return res.status(500).json({'success': false, 'error': 'Failed to get current wifi'});
    }
});

app.post('/api/wifi/connect', (req: Request, res: Response) => {
    try {
        const { ssid, password } = req.body;
        let cmd = `nmcli dev wifi connect ${ssid} password ${password} ifname ${INTERFACE_NAME_PUBLIC_WIFI}`;
        if (!password || password == '') cmd = `nmcli dev wifi connect ${ssid} ifname ${INTERFACE_NAME_PUBLIC_WIFI}`;
        exec(cmd, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({'success': false, 'error': 'Failed to connect to wifi'});
            }
            res.json({'success': true});
        });
    } catch (e) {
        console.error(`exec error: ${e}`);
        return res.status(500).json({'success': false, 'error': 'Failed to connect to wifi'});
    }
});

app.get('/api/wifi/disconnect', (req: Request, res: Response) => {
    try {
        exec(`nmcli dev disconnect ${INTERFACE_NAME_PUBLIC_WIFI}`, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({'success': false, 'error': 'Failed to disconnect from wifi'});
            }
            res.json({'success': true});
        });
    } catch (e) {
        console.error(`exec error: ${e}`);
        return res.status(500).json({'success': false, 'error': 'Failed to disconnect from wifi'});
    }
});

app.get('/api/nordvpn/status', (req: Request, res: Response) => {
    try {
        exec('nordvpn status', (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({'success': false, 'error': 'Failed to get VPN status'});
            }
            const status = stdout.split('\n').reduce((acc: any, line: string) => {
                const [key, value] = line.split(':');
                if(key && value) {
                    // Remove useless characters
                    const cleanKey = key.replace('\r-\r  \r\r-\r  \r', '').trim();
                    acc[cleanKey] = value.trim();
                }
                return acc;
            }, {});
            res.json(status);
        });
    } catch (e) {
        console.error(`exec error: ${e}`);
        return res.status(500).json({'success': false, 'error': 'Failed to get VPN status'});
    }
});

app.post('/api/nordvpn/connect', (req: Request, res: Response) => {
    try {
        const { city } = req.body;
        exec(`nordvpn connect ${city}`, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({'success': false, 'error': 'Failed to connect to VPN'});
            }
            res.json({'success': true});
        });
    } catch (e) {
        console.error(`exec error: ${e}`);
        return res.status(500).json({'success': false, 'error': 'Failed to connect to VPN'});
    }
});

app.get('/api/nordvpn/disconnect', (req: Request, res: Response) => {
    try {
        exec('nordvpn disconnect', (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({'success': false, 'error': 'Failed to disconnect from VPN'});
            }
            res.json({'success': true});
        });
    } catch (e) {
        console.error(`exec error: ${e}`);
        return res.status(500).json({'success': false, 'error': 'Failed to disconnect from VPN'});

    }
});

app.get('/api/hotspot/connected-devices', (req: Request, res: Response) => {
    try {
        exec(`arp -a -i ${INTERFACE_NAME_HOTSPOT}`, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({'success': false, 'error': 'Failed to get connected devices'});
            }

            const devices = stdout.split('\n').map((line: string) => {
                let [hostname, ip, _, mac] = line.split(' ').filter(Boolean);
                ip = ip?.replace('(', '').replace(')', '');
                if(ip || mac || hostname) {
                    return { ip, mac, hostname };
                }

                return null
            }).filter((device: {ip?: string, mac?:string, hostname?:string}) => device !== null);
            res.json(devices);
        });
    } catch (e) {
        console.error(`exec error: ${e}`);
        return res.status(500).json({'success': false, 'error': 'Failed to get connected devices'});
    }
});

// Redirect all the other routes to Vue app
app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '../frontend/index.html'));
});

app.listen(SERVER_PORT, () => {
    console.log('Server running on port', SERVER_PORT);
});