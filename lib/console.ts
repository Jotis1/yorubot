export default function coloredLogs(message: string, color: string) {
    console.log(`\x1b[${color}%s\x1b[0m`, message);
}

export function BoldConsoleLog(text: string) {
    console.log('\x1b[1m%s\x1b[0m', text);
}
