import cv2
import numpy as np
from google.cloud import vision
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os
from datetime import datetime


pdfmetrics.registerFont(TTFont('Times-Roman', 'times.ttf'))  

def preprocess_image(image_path):
    #Preprocess the image to enhance OCR accuracy
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Image at {image_path} not found.")

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.adaptiveThreshold(
        blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
    )

    preprocessed_path = 'processed_note.png'
    cv2.imwrite(preprocessed_path, thresh)
    return preprocessed_path

def recognize_text(image_path):
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'credentials.json'
    client = vision.ImageAnnotatorClient()

    with open(image_path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    response = client.document_text_detection(image=image)

    if response.error.message:
        raise Exception(f"Vision API error: {response.error.message}")

    return response.full_text_annotation.text if response.full_text_annotation.text else "No text detected."

def generate_pdf(text, output_path='handwritten_output.pdf'):
    doc = SimpleDocTemplate(output_path, pagesize=letter)
    styles = getSampleStyleSheet()

    # Custom styles using Times New Roman
    title_style = ParagraphStyle(
        name='Title',
        fontName='Times-Roman',
        fontSize=18,
        leading=22,
        alignment=1,  # Center alignment
        spaceAfter=12
    )

    body_style = ParagraphStyle(
        name='Body',
        fontName='Times-Roman',
        fontSize=12,
        leading=16,
        alignment=TA_JUSTIFY,  # Justify text
        spaceAfter=12
    )

    content = []
    title = Paragraph("Handwritten Notes to Digital Text", title_style)
    content.append(title)
    content.append(Spacer(1, 0.2 * inch))

    date_str = datetime.now().strftime("%B %d, %Y")
    date = Paragraph(f"Generated on: {date_str}", body_style)
    content.append(date)
    content.append(Spacer(1, 0.2 * inch))

    # Convert each paragraph to justified Paragraph
    for para in text.strip().split('\n'):
        if para.strip():
            content.append(Paragraph(para.strip(), body_style))

    doc.build(content)
    print(f"✅ PDF generated at: {output_path}")

def main():
    """Main function to handle user input and process the conversion."""
    try:
        image_path = input("Enter the path to the handwritten note image (e.g., note.png): ").strip()
        if not os.path.isfile(image_path):
            raise FileNotFoundError(f"No such file: {image_path}")

        preprocessed_path = preprocess_image(image_path)
        print("🛠️ Image preprocessing complete...")

        text = recognize_text(preprocessed_path)
        print("\n📄 Extracted Text:\n", text)

        generate_pdf(text, 'handwritten_output.pdf')

        if os.path.exists(preprocessed_path):
            os.remove(preprocessed_path)

    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    main()
