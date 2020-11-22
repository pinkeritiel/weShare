export interface ListOfMembers {
    Member: string; 
    MemberName: string;
    eMail: string; 
    Status: string; 
    StatusDate: string;
  };

export interface  UsageSchedule {
    Member: string; 
    MemberName: string; 
    DateFrom: string; 
    DateTo: string;
    HourFrom: string;  
    HourTo: string;  
    Status: string; 
    Comment: string;
};
export interface Share {
  _id: string;
	ShareName: string;
  ShareDescription: string;
	ResourceType: string;
  OwnerId: string;
	OwnerName: string;
  CreateDate: string;
  NumMembers: number;
  List_of_Members: ListOfMembers[];
  Usage_Schedule:UsageSchedule[];
}
