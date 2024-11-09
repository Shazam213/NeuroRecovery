import os
from langchain import PromptTemplate
from langchain.chains import LLMChain
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

os.environ['GOOGLE_API_KEY'] = 'AIzaSyDrz57DV6pSV4JbROPk22hM60v7EG_166I'

def create_chat_chain():
    try:
        llm = ChatGoogleGenerativeAI(
            model="gemini-pro",
            temperature=0.3,
            convert_system_message_to_human=True,
            verbose=True
        )

        # Create the prompt template
        prompt = PromptTemplate.from_template("""
        Answer the following query in detail, give the answer in html format without the starting code block:
        Query: {query}
        """)

        # Create the chain using the newer recommended approach
        chain = (
            {"query": RunnablePassthrough()} 
            | prompt 
            | llm 
            | StrOutputParser()
        )

        return chain
    except Exception as e:
        print(f"Error creating chain: {str(e)}")
        return None

def main(query):
    try:
        # Create the chain
        chain = create_chat_chain()
        if chain is None:
            return

        # Run the chain
        response = chain.invoke(query)
        # print("\nResponse from Gemini Pro:")
        # print(response)
        
        return response

    except Exception as e:
        print(f"Error during execution: {str(e)}")

if __name__ == "__main__":
    main(query="Describe hailstones")
