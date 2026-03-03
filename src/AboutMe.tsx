import React from 'react';
import profilePhoto from './assets/d3vjamal.jpg';
import { FacebookIcon, LinkedinIcon, MailIcon, Code2 } from 'lucide-react';

const AboutMe: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto space-y-4 animate-fade-in-up">
            <div className="rounded-2xl overflow-hidden border border-border/60 shadow-sm bg-card">
                {/* Gradient banner */}
                <div className="h-28 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 animate-gradient-shift relative">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }} />
                </div>

                <div className="px-6 pb-6">
                    {/* Avatar */}
                    <div className="relative -mt-12 mb-4 w-fit">
                        <div className="w-[72px] h-[72px] rounded-2xl border-4 border-card overflow-hidden shadow-lg ring-2 ring-violet-500/30">
                            <img
                                src={profilePhoto}
                                alt="Profile of Jamaluddin Mondal"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-foreground">Jamaluddin Mondal</h2>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            <Code2 className="w-3.5 h-3.5" />
                            @d3vjamal · Full-Stack Developer
                        </p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        I'm passionate about web development, programming, and all things tech.
                        With a strong background in backend engineering, I enjoy building scalable
                        and efficient applications. Outside of work, I'm a movie enthusiast and a
                        food lover.
                        <br /><br />
                        Feel free to get in touch — I'm open to exciting opportunities and collaborations!
                    </p>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-2">
                        <a
                            href="https://www.facebook.com/d3vjamal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 border border-border/50 text-muted-foreground hover:text-violet-700 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-700/60 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all"
                        >
                            <FacebookIcon className="w-3.5 h-3.5" />
                            Facebook
                        </a>
                        <a
                            href="https://www.linkedin.com/in/d3vjamal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 border border-border/50 text-muted-foreground hover:text-violet-700 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-700/60 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all"
                        >
                            <LinkedinIcon className="w-3.5 h-3.5" />
                            LinkedIn
                        </a>
                        <a
                            href="mailto:d3v.jamal@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 border border-border/50 text-muted-foreground hover:text-violet-700 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-700/60 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all"
                        >
                            <MailIcon className="w-3.5 h-3.5" />
                            Email
                        </a>
                    </div>
                </div>
            </div>

            {/* Built with badge */}
            <p className="text-center text-xs text-muted-foreground/60">
                Built with React + Vite + TailwindCSS
            </p>
        </div>
    );
};

export default AboutMe;
