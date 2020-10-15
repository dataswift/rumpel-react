export interface SystemStatusInterface {
    title: string;
    kind: SystemStatusKindInterface;
}

interface SystemStatusKindInterface {
    metric: string;
    kind: string;
    units?: string;
}
