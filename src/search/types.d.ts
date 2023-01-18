type Id = string | number;
interface Index {
	search: (keyword: string) => Set<Id>;
}

export interface IndexMail {
	id: string;
	subject: string;
	body: string;
	bodyText: string;
}

export type CreateIndex = (mailList: IndexMail[]) => Index;
