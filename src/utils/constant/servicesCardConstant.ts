import Sentimentanalysis from "../../assets/images/Sentimentanalysis.png"
import Mcqgenerator from "../../assets/images/Mcqgenerator.png"
import PDFsummarization from "../../assets/images/PDFsummarization.png"
import SpeechtoText from "../../assets/images/SpeechtoText.png"
import QAoverDatbase from "../../assets/images/QAoverDatbase.png"
import TechnicalQuestion from "../../assets/images/TechnicalQuestion.png"
import CodeEvaluationTool from "../../assets/images/CodeEvaluationTool.png"
import Communicationtool from "../../assets/images/Communicationtool.png"
import RecommendedProducts from "../../assets/images/RecommendedProducts.png"
import Multitranslation from "../../assets/images/Multitranslation.png"

const servicesCardConstant = [
  // {
  //   image:
  //     "https://images.unsplash.com/photo-1679083216051-aa510a1a2c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
  //   title: "QA over documents using GPT API",
  //   description:
  //     "The GPT API offers access to OpenAI's advanced language model, GPT-3, for creating applications that generate human-like text. It allows developers to integrate natural language processing capabilities into various software, enabling tasks like content generation, language translation, code writing, and more, through simple API calls.",
  //   path: "gpt",
  // },
  // {
  //   image:
  //     "https://images.unsplash.com/photo-1495592822108-9e6261896da8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  //   title: "QA over documents using langchain and pinecone API",
  //   description:
  //     "The Pinecone API is a powerful tool for building and deploying vector similarity search in applications. It enables efficient retrieval of similar items from large datasets using embeddings, facilitating tasks like recommendation systems. Its high performance and scalability make it ideal for real-time, AI-driven search solutions.",
  //   path: "pinecone",
  // },
  {
    image:
      QAoverDatbase,
    title: "ConverseAI: Your Virtual Companion ",
    description:
      "Explore the future of information retrieval with our AI-powered chatbots. This innovative feature allows users to ask questions and receive immediate, accurate answers, all powered by advanced artificial intelligence. Whether you need quick facts, detailed explanations, or data insights, a chatbot can be designed to understand your queries and provide comprehensive responses, making information access effortless and efficient.",
    path: "ConverseAI",
    poweredBy: 'Zephyr',
    tag: 't7'
  },
  {
    image: SpeechtoText,
    title: "GlobalSpeak: AI-Powered Translation at Your Fingertips",
    description:
      "Unlock seamless communication across languages with our AI-Powered Translation Tool. Leveraging advanced natural language processing algorithms, this tool is designed to bridge communication gaps and leverages advanced machine learning algorithms to provide accurate and contextually relevant translations in real-time. Whether you need to translate audio files, documents, website content, or social media posts, our tool will ensure that the meaning and context of your original text are preserved. Enhance your global reach and break down language barriers effortlessly with our state-of-the-art translation technology",
    path: "GlobalSpeak",
    poweredBy: 'OpenAI Whisper',
    tag: 't6',
  },
  {
    image: PDFsummarization,
    title: "SmartDigest: AI-Powered Document Summarization",
    description:
      "Unlock the power of efficient reading with our AI-Powered  Summarization Tool. This advanced feature allows you to quickly extract the key points from any resource, saving you valuable time. Whether you're reviewing lengthy articles, reports, research papers, or eBooks, our AI technology provides concise and accurate summaries, enabling you to grasp the essential information at a glance. Simplify your reading experience and enhance productivity with our cutting-edge summarization solution.",
    path: "SmartDigest",
    poweredBy: 'Lamini & OpenAI ',
    tag: 't4',
  },
  {
    image:
      Communicationtool,
    title: "ConverseIQ: Elevate Your Communication with AI-Powered Skills Assessment",
    description:
      "Evaluate and enhance verbal and written communication abilities using this sophisticated feature. Leveraging cutting-edge natural language processing (NLP) algorithms, the solution analyzes users' responses in real-time, providing comprehensive feedback on grammar, clarity, tone, and coherence. Whether you're a professional seeking to refine your presentation skills or a student aiming to improve your writing proficiency, this tool offers personalized insights and tailored recommendations to help you communicate effectively in any context.",
    path: "ConverseIQ",
    poweredBy: 'Gemini',
    tag: 't8',
  },
  {
    image:
      TechnicalQuestion,
    title: "TechIQ: AI-Powered Technical Proficiency Assessment",
    description:
      "Reshape the way you evaluate technical proficiency moving forward. Leveraging advanced artificial intelligence algorithms, this tool offers a comprehensive evaluation of candidates' skills across various domains. With its adaptive assessment approach, it tailors questions dynamically based on the user's responses, ensuring a personalized and accurate evaluation. With the ability to seamlessly integrate into any platform, this tool can streamline the hiring process, enabling recruiters to identify top talent efficiently and effectively.",
    path: "TechIQ",
    poweredBy: 'OpenAI',
    tag: 't2',
  },
  {
    image:
      CodeEvaluationTool,
    title: "CodeCraft: AI-Driven Coding Challenge Platform",
    description:
      "Transform the traditional technical assessment process using this tool. Leveraging cutting-edge artificial intelligence algorithms, the solution streamlines the evaluation of candidates skills with accuracy and efficiency. Through automated code analysis and real-time feedback, recruiters and hiring managers can make data-driven decisions, saving time and ensuring fair evaluation. Say goodbye to manual grading and hello to a smarter, faster, and more effective way to assess coding proficiency.",
    path: "CodeCraft",
    poweredBy: 'OpenAI',
    tag: 't9',
  },
  {
    image:
      Sentimentanalysis,
    title: "EmpathAI: Understanding Sentiment Through AI Insights",
    description:
      "Discover the power of AI-driven sentiment analysis with our cutting-edge tool. Designed to gauge emotions and opinions from text, this tool accurately identifies and categorizes sentiments as positive, negative, or neutral. Whether you're analyzing customer feedback, social media comments, or survey responses, our Sentiment Analysis Tool provides valuable insights to help you understand your audience better and make data-driven decisions. Unlock the potential of your textual data with our intuitive and efficient solution.",
    path: "EmpathAI",
    poweredBy: 'Text Blob',
    tag: 't3',
  },
  {
    image: Mcqgenerator,
    title: "SmartQuiz: AI-Powered MCQ Generator",
    description:
      "Revolutionize the process of question creation by leveraging cutting-edge artificial intelligence technology. Our innovative tool automatically generates a diverse range of MCQs tailored to your specifications, saving valuable time and effort. Whether you're developing quizzes, assessments, or study materials, our MCQ Generator simplifies the task, ensuring high-quality questions that enhance learning outcomes. Experience the future of question generation with our intuitive AI-driven solution.",
    path: "SmartQuiz",
    poweredBy: 'OpenAI',
    tag: 't11'
  },
  {
    image: SpeechtoText,
    title: "Transcribo: AI-Powered Speech-to-Text Summarizer",
    description:
      " Our AI-driven tool transforms the way you consume spoken content. Utilizing cutting-edge artificial intelligence algorithms, it transcribes files into text in real-time and then generates concise summaries, capturing key points and insights. Whether you're in meetings, lectures, or interviews, this tool enhances productivity by condensing lengthy verbal exchanges into digestible, actionable summaries. Say goodbye to tedious note-taking and hello to efficient information absorption with our intuitive Speech-to-Text Summarizer.",
    path: "Transcribo",
    poweredBy: 'Lamini',
    tag: 't5',
  },
  {
    image: RecommendedProducts,
    title: "IntelliFind: Your Personalized Smart Search & Product Recommendation Hub",
    description:
      "Our cutting-edge Smart Search and Product Recommendation engine harnesses the power of AI to deliver an intuitive and personalized user experience. Leveraging advanced AI algorithms, it delivers highly relevant search results and personalized product recommendations in real-time. This dynamic engine learns from user interactions, continuously refining its suggestions to enhance engagement and satisfaction. Whether you're browsing or looking for something specific, our smart technology ensures you find exactly what you need effortlessly.",
    path: "IntelliFind",
    poweredBy: 'KNN',
    tag: 't10',
  },
  // {
  //   image: Multitranslation,
  //   title: "GlobalSpeak: AI-Powered Translation at Your Fingertips",
  //   description:
  //     "Unlock seamless communication across languages with our AI-Powered Translation Tool. Leveraging advanced natural language processing algorithms, this tool is designed to bridge communication gaps and leverages advanced machine learning algorithms to provide accurate and contextually relevant translations in real-time. Whether you need to translate audio files, documents, website content, or social media posts, our tool will ensure that the meaning and context of your original text are preserved. Enhance your global reach and break down language barriers effortlessly with our state-of-the-art translation technology",
  //   path: "multi-translation",
  //   poweredBy: 'OpenAI Whisper',
  //   // tag: 't6',
  // },
  // {
  //   image:
  //     QAoverDatbase,
  //   title: "ConverseAI: Your Virtual Companion ",
  //   description:
  //     "Explore the future of information retrieval with our AI-powered chatbots. This innovative feature allows users to ask questions and receive immediate, accurate answers, all powered by advanced artificial intelligence. Whether you need quick facts, detailed explanations, or data insights, a chatbot can be designed to understand your queries and provide comprehensive responses, making information access effortless and efficient.",
  //   path: "Chatbot",
  //   poweredBy: 'Zephyr',
  //   tag: 't7'
  // },
  // {
  //   image:
  //     "https://images.unsplash.com/photo-1678483789107-0029c61fdcca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1228&q=80",
  //   title: "Private Chat GPT",
  //   description:
  //     "Private ChatGPT enables personalized and secure one-on-one interactions. It ensures confidential conversations while utilizing GPT's language capabilities for tailored assistance. Ideal for applications requiring privacy, such as therapy, legal consultations, or sensitive discussions, Private ChatGPT offers dynamic and discreet communication for users' specific needs.",
  //   path: "chat-GPT",
  // },
];

export default servicesCardConstant;
