import * as http from 'http';

class ServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ServerError';
    }
}

interface ServerOptions {
    hostname: string;
    port: number;
    path: string;
}

interface ApplicationAction {
    execute(): Promise<void>;
}

class RunApplicationAction implements ApplicationAction {
    private readonly serverOptions: ServerOptions;
    private readonly duration: number;

    constructor(serverOptions: ServerOptions, duration: number) {
        this.serverOptions = serverOptions;
        this.duration = duration;
    }

    async execute(): Promise<void> {
        try {
            await this.sendRequest({ duration: this.duration });
            console.log(`Application started for ${this.duration} seconds.`);
        } catch (error) {
            throw new ServerError(`Error occurred while starting application: ${error.message}`);
        }
    }

    private sendRequest(data: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const req = http.request(this.serverOptions, (res) => {
                if (res.statusCode === 200) {
                    resolve();
                } else {
                    reject(new ServerError(`Server responded with status code ${res.statusCode}`));
                }
            });

            req.on('error', (error) => {
                reject(new ServerError(`Error occurred while sending request: ${error.message}`));
            });

            req.write(JSON.stringify(data));
            req.end();
        });
    }
}

class RestartApplicationAction implements ApplicationAction {
    private readonly serverOptions: ServerOptions;

    constructor(serverOptions: ServerOptions) {
        this.serverOptions = serverOptions;
    }

    async execute(): Promise<void> {
        try {
            await this.sendRequest({ action: 'restart' });
            console.log('Application restarting...');
        } catch (error) {
            throw new ServerError(`Error occurred while restarting application: ${error.message}`);
        }
    }

    private sendRequest(data: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const req = http.request(this.serverOptions, (res) => {
                if (res.statusCode === 200) {
                    resolve();
                } else {
                    reject(new ServerError(`Server responded with status code ${res.statusCode}`));
                }
            });

            req.on('error', (error) => {
                reject(new ServerError(`Error occurred while sending request: ${error.message}`));
            });

            req.write(JSON.stringify(data));
            req.end();
        });
    }
}

class ActionFactory {
    static createRunApplicationAction(serverOptions: ServerOptions, duration: number): ApplicationAction {
        return new RunApplicationAction(serverOptions, duration);
    }

    static createRestartApplicationAction(serverOptions: ServerOptions): ApplicationAction {
        return new RestartApplicationAction(serverOptions);
    }
}

class ApplicationManager {
    private readonly actions: ApplicationAction[];

    constructor(actions: ApplicationAction[]) {
        this.actions = actions;
    }

    async executeActions(): Promise<void> {
        for (const action of this.actions) {
            await action.execute();
        }
    }
}
const serverOptions: ServerOptions = {
    hostname: 'your_server_hostname',
    port: 8080,
    path: '/run_application'
};
const applicationDuration = 24 * 60 * 60; // 24 hours in seconds
const restartDuration = 2 * 60; // 2 minutes in seconds

const runAction = ActionFactory.createRunApplicationAction(serverOptions, applicationDuration);
const restartAction = ActionFactory.createRestartApplicationAction(serverOptions);

const applicationManager = new ApplicationManager([runAction, restartAction]);

async function main() {
    try {
        await applicationManager.executeActions();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
