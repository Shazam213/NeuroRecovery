from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load LLaMA 3.1 model from Hugging Face
model_name = "meta-llama/Llama-2-7b-chat-hf"
token_name = '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'

# Load the tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token=token_name)

# Load the model and move it to GPU
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    use_auth_token=token_name,
    device_map="auto",  # Use Accelerate to split model across available devices
    torch_dtype=torch.float16  # Half-precision
)

# input_text="Generate a memory exercise for an intermediate-level TBI patient"

def main(query):
    input_text = f'''
        Question:
        You are an expert cognitive therapist and medical AI assistant...

        Example interpretation:
        For a low score in Delayed Recall (e.g., 1/5), note that the patient may have difficulty with memory recall.
        - **Exercises**:
        - Practice daily memory exercises, like recalling the day's events in order.
        - Use memory aids such as word-recall games or repeating lists of items.

        Analyze this patient's scores:

        {query}

        Please analyze and respond in the structured format provided.

        1. **Impairment**: [Cognitive impairment detected]
        - **Exercises**:
            - Exercise 1: [detailed description in multiple points]
                            [steps to perform exercise]
            - Exercise 2: [detailed description]
                            [steps to perform exercise]
        Answer:
        '''
    inputs = tokenizer(input_text, return_tensors="pt").to("cuda")  # Move inputs to GPU

    with torch.no_grad():
        outputs = model.generate(
        **inputs,
        max_new_tokens=5000,
        do_sample=True,
        temperature=0.7,
        eos_token_id=tokenizer.eos_token_id,
        pad_token_id=tokenizer.eos_token_id
    )
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    # print(response)

    answer_text = response.split("Answer:", 1)[1].strip()
    

    return answer_text


if __name__=="__main__":
    main(""" 
        - Visuospatial/Executive: 4/5
        - Naming: 3/3
        - Attention: 5/6
        - Language: 2/3
        - Abstraction: 2/2
        - Delayed Recall: 1/5
        - Orientation: 5/6
        - Total: 22/30
    """)