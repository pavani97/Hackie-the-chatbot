# 🤖 Hackie - The Chatbot

Hackie is a Python-based chatbot project designed to provide an interactive conversational experience.

## 📌 Features

* 🤖 Interactive chatbot
* 💬 Conversational responses
* 🐍 Built with Python
* ⚡ Easy to install and run
* 🔧 Simple project structure
* 🧪 Suitable for learning and experimentation

---

## 🛠️ Technologies Used

* Python
* Git & GitHub
* Python Virtual Environment
* Required Python libraries listed in `requirements.txt`

---

## 📂 Project Structure

```text
hackie-the-chatbot/
│
├── app.py                  # Main application
├── requirements.txt        # Python dependencies
├── .env.example            # Environment variable template
├── .gitignore              # Files ignored by Git
└── README.md               # Project documentation
```

> The exact files may vary depending on the current version of the project.

---

# 🚀 Installation & Setup

Follow the steps below to run Hackie on your computer.

## 1. Prerequisites

Make sure you have the following installed:

* Python 3.x
* Git

Check Python:

```bash
python --version
```

Check Git:

```bash
git --version
```

---

## 2. Clone the Repository

Open PowerShell, Command Prompt, or Terminal and run:

```bash
git clone https://github.com/pavani97/hackie-the-chatbot.git
```

Move into the project directory:

```bash
cd hackie-the-chatbot
```

---

## 3. Create a Virtual Environment

Create a Python virtual environment:

```bash
python -m venv venv
```

---

## 4. Activate the Virtual Environment

### Windows PowerShell

```powershell
venv\Scripts\activate
```

### Windows Command Prompt

```cmd
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

After activation, you should see something similar to:

```text
(venv)
```

at the beginning of your terminal prompt.

---

## 5. Install Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

---

# 🔐 Environment Variables

If the project requires API keys or other configuration values, create a `.env` file.

If `.env.example` is provided:

### Windows

```powershell
copy .env.example .env
```

### macOS / Linux

```bash
cp .env.example .env
```

Then open `.env` and add your own API key or configuration values.

Example:

```text
API_KEY=your_api_key_here
```

⚠️ **Never upload your `.env` file or API keys to GitHub.**

---

# ▶️ Run the Chatbot

After activating the virtual environment and installing the dependencies, run:

```bash
python app.py
```

If your main Python file has a different name, replace `app.py` with that filename.

For example:

```bash
python main.py
```

---

# 💬 Using Hackie

Once the application starts, follow the instructions displayed in the terminal or application interface.

You can then interact with Hackie and test its chatbot functionality.

---

# 🧪 Example

```text
User: Hello Hackie!

Hackie: Hello! How can I help you today?
```

---

# 🛑 Deactivate the Virtual Environment

When you're finished:

```bash
deactivate
```

---

# 🔄 Updating the Project

If the project receives new updates, first move into the project directory:

```bash
cd hackie-the-chatbot
```

Then pull the latest version:

```bash
git pull origin main
```

If you have a virtual environment already created, activate it again:

```powershell
venv\Scripts\activate
```

Then update dependencies:

```bash
pip install -r requirements.txt
```

---

# 🐛 Troubleshooting

## Python is not recognized

If you see:

```text
'python' is not recognized...
```

Install Python and make sure Python is added to your system PATH.

Then restart your terminal.

---

## Git is not recognized

If you see:

```text
'git' is not recognized...
```

Install Git and restart your terminal.

---

## Virtual environment activation fails

Try:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then:

```powershell
venv\Scripts\activate
```

---

## ModuleNotFoundError

If you see:

```text
ModuleNotFoundError: No module named 'something'
```

Make sure your virtual environment is activated and run:

```bash
pip install -r requirements.txt
```

---

## API Key Error

Check that:

1. Your `.env` file exists.
2. The API key is entered correctly.
3. The variable name matches the name expected by the application.
4. You restarted the application after changing the `.env` file.

---

# 🔒 Security

Please do not commit sensitive information to GitHub.

Never upload:

```text
.env
API keys
Passwords
Access tokens
Private credentials
```

Make sure these are included in `.gitignore`.

---

# 🤝 Contributing

Contributions are welcome!

To contribute:

1. Fork the repository.
2. Clone your fork.
3. Create a new branch.

```bash
git checkout -b feature/my-feature
```

4. Make your changes.
5. Commit your changes.

```bash
git add .
git commit -m "Add new feature"
```

6. Push your branch.

```bash
git push origin feature/my-feature
```

7. Open a Pull Request.

---

# 📜 License

Add your preferred license here.

If this project does not currently have a license, you can remove this section.

---

# 👩‍💻 Author

**Pavani**

GitHub:
https://github.com/pavani97

Project Repository:
https://github.com/pavani97/hackie-the-chatbot

---

⭐ If you find Hackie useful, consider giving the repository a star!
