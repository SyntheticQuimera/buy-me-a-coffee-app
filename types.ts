export interface AirtableRecord {
    records: Record[];
    offset: string;
}

export interface Record {
    id: string;
    createdTime: Date;
    fields: Fields;
}

export interface Fields {
    name: string;
    amount: number;
    message?: string;
}