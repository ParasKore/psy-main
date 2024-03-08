import { toast } from "react-toastify";
import { PostApi } from "../../lib/axios-api";

export default async function AddReply(
  user,
  postId,
  commentId,
  parentId,
  replyContent
) {
  try {
    const res = await PostApi("add-reply", {
      user_id: user.id,
      post_id: postId,
      comment_id: commentId,
      parent_id: parentId,
      content: replyContent,
    });

    console.log("Reply submitted:", replyContent);
    console.log("Reply submitted:", {
      user_id: user.id,
      post_id: postId,
      comment_id: commentId,
      parent_id: parentId,
      content: replyContent,
    });

    if (res && res.message == "reply added successfully") {
      toast.success("Reply Added!!");

      const newReply = [
        {
          user: {
            user_name: user.user_name,
            profile: user.profile,
          },
          content: replyContent,
          id: res.data.id,
          human_readable_created_at: "1 sec ago",
        },
      ];

      return newReply;
    } else {
      toast.error("Something went wrong!!");
    }
    console.log(res);
  } catch (error) {
    toast.error("Something went wrong!!");
    console.log("error", error);
  }
}
