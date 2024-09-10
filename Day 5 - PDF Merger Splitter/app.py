import os
import PyPDF2

# Function to merge multiple PDFs
def merge_pdfs(pdf_list, output_path):
    pdf_merger = PyPDF2.PdfMerger()
    for pdf in pdf_list:
        with open(pdf, 'rb') as f:
            pdf_merger.append(f)
    with open(output_path, 'wb') as output_pdf:
        pdf_merger.write(output_pdf)
    print(f"PDFs merged successfully into {output_path}")

# Function to split a PDF into separate pages
def split_pdf(pdf_path, output_dir):
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        for page_number in range(len(pdf_reader.pages)):
            pdf_writer = PyPDF2.PdfWriter()
            pdf_writer.add_page(pdf_reader.pages[page_number])

            output_filename = f"{output_dir}/page_{page_number+1}.pdf"
            with open(output_filename, 'wb') as output_pdf:
                pdf_writer.write(output_pdf)
            print(f"Page {page_number+1} saved as {output_filename}")

# Main function
def main():
    print("PDF Merger and Splitter Tool")
    print("1. Merge PDFs")
    print("2. Split a PDF")
    
    choice = input("Choose an option (1/2): ")
    
    if choice == '1':
        # Merge PDFs
        num_files = int(input("Enter the number of PDFs to merge: "))
        pdf_files = []
        for i in range(num_files):
            pdf_file = input(f"Enter the path to PDF {i+1}: ")
            pdf_files.append(pdf_file)
        output_file = input("Enter the output file name (e.g., merged.pdf): ")
        merge_pdfs(pdf_files, output_file)

    elif choice == '2':
        # Split a PDF
        pdf_to_split = input("Enter the path to the PDF to split: ")
        output_dir = input("Enter the output directory: ")
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        split_pdf(pdf_to_split, output_dir)

    else:
        print("Invalid choice. Please select 1 or 2.")

if __name__ == "__main__":
    main()
