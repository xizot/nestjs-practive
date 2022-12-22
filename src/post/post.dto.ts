export interface PostDto {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  userCreated: string | null;
  isDeleted: boolean;
}
