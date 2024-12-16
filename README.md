# Neoway Code Challenge

This project was developed as part of the technical assessment for a role at Neoway.

## 🚀 Getting Started

These instructions will help you get a copy of the project up and running on your local machine.

### Prerequisites

- Docker
- Docker Compose

### Installation and Running

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neoway-code-challenge.git
   cd neoway-code-challenge
   ```

2. Start the application using Docker Compose:
   ```bash
   docker compose up -d
   ```

3. Access the application:
   - Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Built With

- React.js - Frontend Framework
- Node.js - Backend Framework
- Tailwind CSS - Styling
- Docker - Containerization

## 📝 Project Structure

neoway-code-challenge/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ │ └── cpfCnpjController.js
│ │ ├── models/
│ │ │ └── CpfCnpj.js
│ │ ├── routes/
│ │ │ └── cpfCnpjRoutes.js
│ │ ├── services/
│ │ │ └── cpfCnpjService.js
│ │ ├── utils/
│ │ │ └── validators.js
│ │ └── app.js
│ ├── package.json
│ └── .env
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── CpfCnpjForm.js
│ │ │ ├── CpfCnpjList.js
│ │ │ ├── ErrorMessage.js
│ │ │ └── Filters.js
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── tailwind.config.js
└── docker-compose.yml

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ✨ Author

Guilherme Schlup - [Your GitHub Profile](https://github.com/gschlup)