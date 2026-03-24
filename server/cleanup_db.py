import requests
import json

projects_data = [
  {
    "id": "grepnow",
    "name": "gREP - Vocabulary Demystified",
    "summary": "Master vocabulary for personal growth and eloquent expression through a scientifically proven spaced repetition algorithm and elegant, minimal design. Available on Android.",
    "problem_statement": "Traditional vocabulary learning is often disorganized and ineffective. gREP solves this by providing an intuitive, beautiful, and scientifically effective way to learn and master words through spaced repetition, word of the day, and progress tracking.",
    "media": [
      { "type": "image", "url": "https://www.grepnow.in/og-image.png", "width": "100%", "height": "auto" }
    ],
    "technologies_used": ["React Native", "Android", "Spaced Repetition Algorithm", "Offline Support", "Gesture-Based UI", "SQLite", "Firebase"],
    "github_repo": "https://github.com/aniike-t/grep-vocabulary",
    "url": "https://grepnow.in/",
    "layout": { "width": 2, "height": 2 }
  },
  {
    "id": "artx3d",
    "name": "ArtX3D",
    "summary": "A Web-Based 3D Editor with an AI Assistant and Cloud Storage, designed to make 3D modeling accessible and intuitive for everyone.",
    "problem_statement": "The project addresses the high barrier to entry in 3D modeling, which often requires complex, expensive software. ArtX3D provides a free, browser-based solution with AI-powered features to simplify the creative process.",
    "media": [
      { "type": "video/mp4", "url": "https://mafuscruvmcbdlvmepvx.supabase.co/storage/v1/object/public/PortfolioWebsite/ArtX3D/compressedArtX3D.mp4" }
    ],
    "technologies_used": ["React", "Three.js", "Python", "Flask", "Gemini API", "AWS", "Supabase", "PostgreSQL", "Cloudflare"],
    "github_repo": "https://github.com/Aniike-t/Art_X_3D",
    "layout": { "width": 2, "height": 2 }
  },
  {
    "id": "cbir-vision-transformer",
    "name": "Content Based Image Retrieval with Vision Transformer",
    "summary": "Retrieves visually similar images from a database based on content, utilizing a Vision Transformer (ViT) model and a hybrid Boolean & VSM ranking system.",
    "problem_statement": "Traditional keyword-based image search is often inaccurate. This project implements a content-based image retrieval (CBIR) system that 'sees' the content of images, leading to more relevant search results.",
    "media": [
      { "type": "image", "url": "https://pub-e3e2c973a37c42f6a52f0eebe2209d35.r2.dev/CBIR.png", "width": "100%", "height": "auto" }
    ],
    "technologies_used": ["Python", "PyTorch", "Vision Transformer (ViT)", "Flask", "OpenCV", "SQL", "Inverted Index", "Boolean Retrieval", "Vector Space Model (VSM)", "Custom Hybrid Algorithm"],
    "github_repo": "https://github.com/Aniike-t/Content-based-Image-Retrieval",
    "layout": { "width": 2, "height": 2 }
  },
  {
    "id": "course-it",
    "name": "Course.it",
    "summary": "A mobile application designed for creating personalized and gamified learning tracks to make education more engaging and tailored to individual needs.",
    "problem_statement": "One-size-fits-all learning paths can be demotivating. Course.it allows users to build custom learning journeys, track progress, and earn rewards, making learning a more interactive and personal experience.",
    "media": [
      { "type": "video/mp4", "url": "https://mafuscruvmcbdlvmepvx.supabase.co/storage/v1/object/public/PortfolioWebsite/CourseIT/v3demo.mp4", "height": "auto", "width": 300 }
    ],
    "technologies_used": ["React Native", "Expo", "Vercel", "Flask", "Python", "MongoDB"],
    "github_repo": "https://github.com/Aniike-t/Course.it",
    "layout": { "width": 2, "height": 1 }
  },
  {
    "id": "neural-style-transfer",
    "name": "Neural Style Transfer",
    "summary": "This project blends the content of images and videos with the artistic styles of famous paintings using VGG19 and CartoonGAN models.",
    "problem_statement": "Creating artistic effects manually is time-consuming. This tool automates the process, allowing users to instantly apply any artistic style to their own photos and videos, creating unique visual content.",
    "media": [
      { "type": "video/mp4", "url": "https://mafuscruvmcbdlvmepvx.supabase.co/storage/v1/object/public/PortfolioWebsite/NeuralStyleTransfer/styleTransfer.mp4", "width": "100%", "height":"auto" }
    ],
    "technologies_used": ["Python", "TensorFlow", "VGG19", "CartoonGAN", "OpenCV"],
    "github_repo": "https://github.com/Aniike-t/Style-Transfer",
    "layout": { "width": 2, "height": 1 }
  }
]

url = "http://localhost:5000/init_projects_db"
try:
    response = requests.post(url, json=projects_data)
    print(f"Status: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
