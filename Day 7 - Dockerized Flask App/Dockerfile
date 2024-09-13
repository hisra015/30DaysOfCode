# Use the official Python image from Docker Hub
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory's contents into the container
COPY . /app

# Install the required dependencies (Flask)
RUN pip install Flask

# Expose port 5000 to the host
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]
