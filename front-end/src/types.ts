
type ClashFormType = {
    title?: string;
    description?: string;
}
type ClashFormTypeError = {
    title?:string;
    description?:string;
    expire_at?:string;
    image?:string;
}
type ClashType = {
    id: number;
    user_id: number;    
    title: string;
    description: string;
    image: string;
    expires_at: string;
    created_at: string;
    ClashItems:Array<ClashItem>;
    ClashComments:Array<ClashComment>;

}
type ClashItemsForm = {
    image:File|null;
}
type ClashItem ={
    id:number;
    image:string;
    count:number;
}
type ClashComment = {
    id:number;
    comment:string;
    created_at:string;
}