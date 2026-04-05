'use client';

import React from 'react';

interface LegalItem {
    type: 'heading' | 'paragraph' | 'list';
    content: string | string[];
}

interface LegalBaseProps {
    title: string;
    data: LegalItem[];
}

const LegalBase: React.FC<LegalBaseProps> = ({ title, data }) => {
    return (
        <div className="legal-container">
            <div className="legal-wrapper">
                <header className="legal-header">
                    <h1 className="legal-title">
                        {title}
                    </h1>
                    <p className="legal-subtitle">
                        Advanced Health Company SAS - Información Legal y Regulatoria
                    </p>
                </header>

                <article className="legal-content">
                    {data.map((item, index) => {
                        if (item.type === 'heading') {
                            if (item.content.toString().toUpperCase() === title.toUpperCase()) {
                                return null;
                            }
                            return (
                                <h2 key={index} className="legal-section-title">
                                    {item.content}
                                </h2>
                            );
                        }
                        if (item.type === 'paragraph') {
                            return (
                                <p key={index} className="legal-paragraph">
                                    {item.content}
                                </p>
                            );
                        }
                        if (item.type === 'list' && Array.isArray(item.content)) {
                            return (
                                <ul key={index} className="legal-list">
                                    {item.content.map((listItem, listIndex) => (
                                        <li key={listIndex} className="legal-list-item">
                                            <span className="legal-list-number">
                                                {listIndex + 1}
                                            </span>
                                            <span className="legal-list-text">
                                                {listItem}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            );
                        }
                        return null;
                    })}
                </article>

                <footer className="legal-footer">
                    <p>© {new Date().getFullYear()} Advanced Health Company SAS. Todos los derechos reservados.</p>
                    <p className="legal-footer-tag">CALIDAD CLÍNICA • CALIDAD SUPERIOR</p>
                </footer>
            </div>

            <style jsx>{`
        .legal-container {
          min-height: 100vh;
          background-color: #ffffff;
          padding: 8rem 1rem 5rem;
        }
        .legal-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }
        .legal-header {
          margin-bottom: 4rem;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 3rem;
          text-align: center;
        }
        .legal-title {
          font-family: var(--font-headline);
          font-size: 3rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .legal-subtitle {
          font-family: var(--font-body);
          font-size: 1.125rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }
        .legal-content {
          font-family: var(--font-body);
          color: #334155;
          line-height: 1.8;
        }
        .legal-section-title {
          font-family: var(--font-headline);
          font-size: 1.75rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
          padding-left: 1.25rem;
          border-left: 5px solid var(--primary);
          line-height: 1.2;
        }
        .legal-paragraph {
          margin-bottom: 1.5rem;
          text-align: justify;
        }
        .legal-list {
          list-style: none;
          padding: 0;
          margin: 2rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .legal-list-item {
          display: flex;
          align-items: flex-start;
          background: #f8fafc;
          padding: 1.25rem;
          border-radius: 1rem;
          border: 1px solid #f1f5f9;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .legal-list-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          background: #ffffff;
          border-color: var(--primary);
        }
        .legal-list-number {
          flex-shrink: 0;
          width: 2rem;
          height: 2rem;
          background: var(--primary);
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
          margin-right: 1.25rem;
          margin-top: 0.125rem;
        }
        .legal-list-text {
          font-size: 1rem;
          color: #1e293b;
        }
        .legal-footer {
          margin-top: 6rem;
          padding-top: 3rem;
          border-top: 1px solid #f1f5f9;
          text-align: center;
          color: #94a3b8;
          font-size: 0.875rem;
        }
        .legal-footer-tag {
          margin-top: 0.5rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--primary);
          font-family: var(--font-headline);
        }
        @media (max-width: 640px) {
          .legal-title {
            font-size: 2rem;
          }
          .legal-section-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
        </div>
    );
};

export default LegalBase;
