export interface todoProps {
  id: string;
  name: string;
  status: Boolean;
}

export enum Tab {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}
