"use client";

import React from "react";

import Link from "next/link";

// You may want to move this CSS to a separate file and import it, but for now, we use a style tag.
const pageStyles = `
:root {
    --haiec-primary: #0a3d62;
    --haiec-secondary: #3c6382;
    --secure-gray: #576574;
    --light-blue-bg: #f0f5f9;
    --white: #ffffff;
    --border-color: #dbe4ee;
    --card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --security-shadow: 0 20px 25px -5px rgba(10, 61, 98, 0.1), 0 10px 10px -5px rgba(10, 61, 98, 0.04);
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--light-blue-bg);
    color: var(--secure-gray);
    line-height: 1.6;
}

/* Utility Classes from original code */
.min-h-screen { min-height: 100vh; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.max-w-5xl { max-width: 64rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.text-center { text-align: center; }
.mb-16 { margin-bottom: 4rem; }
.p-10 { padding: 2.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.border { border-width: 1px; }
.border-blue-100 { border-color: var(--border-color); }
.text-5xl { font-size: 3rem; line-height: 1; }
.font-extrabold { font-weight: 800; }
.text-haiec-primary { color: var(--haiec-primary); }
.mb-4 { margin-bottom: 1rem; }
.tracking-tight { letter-spacing: -0.025em; }
.drop-shadow { filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06)); }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.font-light { font-weight: 300; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-12 { margin-bottom: 3rem; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.grid { display: grid; }
.list-disc { list-style-type: disc; }
.ml-5 { margin-left: 1.25rem; }
.ml-6 { margin-left: 1.5rem; }
.leading-relaxed { line-height: 1.625; }
.text-white { color: var(--white); }

/* Custom Component Styles */
.bg-security {
    background-image: radial-gradient(circle at 1px 1px, rgba(10, 61, 98, 0.1) 1px, transparent 0);
    background-size: 2rem 2rem;
}
.header-bg {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}
.security-shadow { box-shadow: var(--security-shadow); }
.text-secure-gray { color: var(--secure-gray); }
.security-icon {
    font-size: 1.2em;
    display: inline-block;
}

/* Buttons */
.btn-primary, .btn-secondary {
    display: inline-block;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 500;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    border: 1px solid transparent;
}
.btn-primary:hover, .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.btn-primary {
    background-color: var(--haiec-primary);
    color: var(--white);
}
.btn-secondary {
    background-color: var(--white);
    color: var(--haiec-primary);
    border-color: var(--border-color);
}

/* Cards */
.card-security {
    background-color: var(--white);
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--border-color);
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-security:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.08);
}
.security-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: var(--light-blue-bg);
    color: var(--haiec-secondary);
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.6rem;
    border-radius: 9999px;
}
.text-gray-600 { color: #4b5563; }
.text-gray-500 { color: #6b7280; }
.text-gray-700 { color: #374151; }
.text-purple-700 { color: #6d28d9; }
.text-green-700 { color: #047857; }
.text-yellow-700 { color: #b45309; }

/* Responsive Grid */
@media (min-width: 768px) {
    .md\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
    .md\:flex-row { flex-direction: row; }
    .md\:mt-0 { margin-top: 0; }
}
@media (min-width: 1024px) {
    .lg\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}
`;

export default function Page() {
    React.useEffect(() => {
        // Dynamically add Google Fonts
        const link1 = document.createElement("link");
        link1.rel = "preconnect";
        link1.href = "https://fonts.googleapis.com";
        document.head.appendChild(link1);

        const link2 = document.createElement("link");
        link2.rel = "preconnect";
        link2.href = "https://fonts.gstatic.com";
        link2.crossOrigin = "anonymous";
        document.head.appendChild(link2);

        const link3 = document.createElement("link");
        link3.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap";
        link3.rel = "stylesheet";
        document.head.appendChild(link3);

        // Add the style tag
        const style = document.createElement("style");
        style.innerHTML = pageStyles;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(link1);
            document.head.removeChild(link2);
            document.head.removeChild(link3);
            document.head.removeChild(style);
        };
    }, []);

    return (
        <main className="bg-security min-h-screen px-4 py-12">
            <div className="max-w-5xl mx-auto">
                {/* Hero Section */}
                <header className="text-center mb-16 security-shadow rounded-xl p-10 header-bg border border-blue-100">
                    <h1 className="text-5xl font-extrabold text-haiec-primary mb-4 tracking-tight drop-shadow flex items-center justify-center gap-2">
                        <span className="security-icon">🛡️</span>
                        HAIEC Compliance
                    </h1>
                    <p className="text-2xl text-secure-gray mb-8 font-light">
                        Empowering Responsible AI: Ethics, Compliance, and Trust for Modern Enterprises
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link href="/login" className="btn-primary shadow-lg text-lg px-8 py-3">
                            Login
                        </Link>
                        <a href="#" className="btn-secondary text-lg px-8 py-3">
                            Learn More
                        </a>
                    </div>
                </header>

                {/* Features Section */}
                <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="card-security">
                        <span className="security-badge">Secured</span>
                        <h3 className="text-xl font-semibold mb-3 text-haiec-primary flex items-center gap-2">
                            <span className="security-icon">🔒</span>
                            AI Compliance Framework
                        </h3>
                        <p className="text-gray-600 mb-2">
                            End-to-end frameworks for AI governance, regulatory adherence, and ethical implementation.
                        </p>
                        <ul className="text-sm text-gray-500 list-disc ml-5">
                            <li>Policy Templates</li>
                            <li>Automated Documentation</li>
                            <li>Global Regulation Mapping</li>
                        </ul>
                    </div>
                    <div className="card-security">
                        <span className="security-badge">Secured</span>
                        <h3 className="text-xl font-semibold mb-3 text-purple-700 flex items-center gap-2">
                            <span className="security-icon">🧮</span>
                            Risk Assessment Tools
                        </h3>
                        <p className="text-gray-600 mb-2">
                            Identify, evaluate, and mitigate AI risks with advanced analytics and reporting.
                        </p>
                        <ul className="text-sm text-gray-500 list-disc ml-5">
                            <li>Bias & Fairness Analysis</li>
                            <li>Impact Scoring</li>
                            <li>Automated Risk Alerts</li>
                        </ul>
                    </div>
                    <div className="card-security">
                        <span className="security-badge">Secured</span>
                        <h3 className="text-xl font-semibold mb-3 text-green-700 flex items-center gap-2">
                            <span className="security-icon">📊</span>
                            Audit & Monitoring
                        </h3>
                        <p className="text-gray-600 mb-2">
                            Real-time monitoring and audit trails to ensure ongoing compliance and transparency.
                        </p>
                        <ul className="text-sm text-gray-500 list-disc ml-5">
                            <li>Continuous Auditing</li>
                            <li>Compliance Dashboards</li>
                            <li>Automated Reporting</li>
                        </ul>
                    </div>
                    <div className="card-security">
                        <span className="security-badge">Secured</span>
                        <h3 className="text-xl font-semibold mb-3 text-yellow-700 flex items-center gap-2">
                            <span className="security-icon">🎓</span>
                            Training & Awareness
                        </h3>
                        <p className="text-gray-600 mb-2">
                            Empower your teams with up-to-date AI ethics training and compliance resources.
                        </p>
                        <ul className="text-sm text-gray-500 list-disc ml-5">
                            <li>Interactive Modules</li>
                            <li>Certification Programs</li>
                            <li>Resource Library</li>
                        </ul>
                    </div>
                </section>

                {/* Welcome / About Section */}
                <section className="header-bg p-10 rounded-2xl shadow-lg border border-blue-100 mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-haiec-primary flex items-center gap-2">
                        <span className="security-icon">🤝</span>
                        Welcome to HAIEC Compliance
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                        HAIEC Compliance is your trusted partner for responsible AI adoption. Our platform helps organizations navigate the evolving landscape of AI governance, ensuring every system is ethical, transparent, and compliant with global standards.
                    </p>
                    <ul className="list-disc ml-6 text-gray-600 mb-4">
                        <li>Comprehensive risk assessment and mitigation strategies</li>
                        <li>Automated compliance documentation and audit support</li>
                        <li>Continuous monitoring and real-time alerts</li>
                        <li>Expert guidance on regulatory changes and best practices</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        Build trust in your AI systems and demonstrate your commitment to ethical innovation with HAIEC Compliance.
                    </p>
                </section>

                {/* Call to Action */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-haiec-primary text-white rounded-xl px-8 py-6 security-shadow">
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                            <span className="security-icon">🚀</span>
                            Ready to ensure your AI is compliant?
                        </h3>
                        <p className="text-lg font-light">Get started today or contact our experts for a personalized demo.</p>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="btn-secondary bg-white text-haiec-primary hover:bg-gray-100">
                            Get Started
                        </a>
                        <a href="#" className="btn-primary border-white">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
