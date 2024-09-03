const paths = {
  gpt: "/gpt",
  pinecone: "/pinecone",
  langchain: "/pdf-summarization",
  huggingFace: "/sentiment-analysis",
  chatGPT: "/chat-GPT",
  home: "/",
};

function getTitle(pathName: string): string {
  switch (pathName) {
    case paths.home:
      return "Home";
    case paths.gpt:
      return "GPT";
    case paths.pinecone:
      return "pinecone";
    case paths.chatGPT:
      return "chatGPT";
    case paths.huggingFace:
      return "sentiment-analysis";
    case paths.langchain:
      return "pdf-summarization";
    default:
      return "AI App";
  }
}
export default getTitle;
