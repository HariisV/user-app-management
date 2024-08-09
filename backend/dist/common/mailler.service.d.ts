export declare class MailerService {
    private transporter;
    constructor();
    sendMail(to: string, text: string, fileName?: string, payload?: any): Promise<any>;
}
