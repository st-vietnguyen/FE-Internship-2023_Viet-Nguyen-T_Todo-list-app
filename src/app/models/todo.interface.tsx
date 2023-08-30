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

export interface ActionType {
  type: string;
  payload: any;
}
