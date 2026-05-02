"use client";

import { motion } from "framer-motion";
import {
  Cloud, ExternalLink, Mail, MapPin, Phone, BookOpen,
  Briefcase, Award, Layers, Zap, CheckCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const skills = ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Python", "Bash", "PostgreSQL", "MongoDB"];

const certs = [
  { title: "AWS Cloud Internship", icon: <Award className="w-4 h-4 text-amber-500" /> },
  { title: "DevOps Certification", icon: <Award className="w-4 h-4 text-amber-500" /> },
  { title: "AWS Cloud Simulation", icon: <Award className="w-4 h-4 text-amber-500" /> },
];

const strengths = ["Cloud Architecture", "CI/CD Automation", "Problem Solving", "Self-driven mindset"];

export default function DeveloperProfile() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Hero Card */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 sm:p-10 premium-shadow border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-8"
        >
          <div className="shrink-0">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-xl border-4 border-white bg-gradient-to-br from-green-400 to-green-600">
              <Image
                src="https://i.ibb.co/vxhMHVfT/image.jpg"
                alt="Adya Sharma"
                fill
                className="object-cover"
                unoptimized
              />
              {/* Initials shown if image fails to load (CSS only fallback) */}
              <span className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold select-none pointer-events-none opacity-0">
                AS
              </span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Adya Sharma</h1>
            <p className="mt-2 text-green-600 font-medium text-base sm:text-lg">
              Cloud & DevOps Engineer
            </p>
            <p className="mt-1 text-gray-500 text-sm">
              AWS &bull; CI/CD &bull; Docker &bull; Kubernetes
            </p>

            <div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Bareilly, India</span>
              <a href="mailto:adyaa.sh22@gmail.com" className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
                <Mail className="w-4 h-4" /> adyaa.sh22@gmail.com
              </a>
              <a href="tel:+918449363422" className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
                <Phone className="w-4 h-4" /> +91 8449363422
              </a>
            </div>

            <div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-3">
              <a href="https://linkedin.com/in/adya-sharma-403124251" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full text-sm font-medium transition-colors">
                <ExternalLink className="w-4 h-4" /> LinkedIn
              </a>
              <a href="https://github.com/adya-hub" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">
                <ExternalLink className="w-4 h-4" /> GitHub
              </a>
              <a href="https://medium.com/@adyaa.sh22" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">
                <BookOpen className="w-4 h-4" /> Medium
              </a>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 premium-shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-green-500" /> Professional Summary
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Results-driven graduate with hands-on experience in AWS cloud infrastructure, DevOps automation, and CI/CD pipelines.
            Proven ability to design and deploy scalable cloud solutions using Docker, Kubernetes, and AWS services (EC2, Lambda, ECS, IAM).
            Skilled in automating deployment workflows, implementing security best practices, and optimizing cloud resources for cost efficiency.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-2xl p-8 premium-shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-5">
            <Layers className="w-5 h-5 text-green-500" /> Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-4 py-1.5 bg-green-50 text-green-700 border border-green-100 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Experience + Education Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 premium-shadow border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-5">
              <Briefcase className="w-5 h-5 text-green-500" /> Experience
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <p className="font-medium text-gray-800 text-sm">Cloud Intern</p>
                  <p className="text-xs text-gray-500">Extion Infotech &bull; 2024</p>
                </div>
              </div>
              <ul className="ml-7 mt-2 space-y-1 text-sm text-gray-600">
                {["IAM policies & security", "EC2 optimization", "AWS Lambda automation", "Elastic Beanstalk deployment", "VPC & security configuration"].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-white rounded-2xl p-8 premium-shadow border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-5">
              <BookOpen className="w-5 h-5 text-green-500" /> Education
            </h2>
            <div className="space-y-4 text-sm">
              {[
                { deg: "MCA", inst: "MJPRU", year: "2025–2027 (Pursuing)" },
                { deg: "BCA", inst: "Invertis University", year: "2022–2025" },
                { deg: "Intermediate", inst: "Mahamaya Vihar Public School", year: "" },
                { deg: "High School", inst: "Jingle Bells Public School", year: "" },
              ].map((ed) => (
                <div key={ed.deg} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-green-400 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{ed.deg}</p>
                    <p className="text-gray-500 text-xs">{ed.inst} {ed.year && `· ${ed.year}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Project */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 premium-shadow border border-green-100">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-green-500" /> Featured Project
          </h2>
          <h3 className="font-bold text-gray-800 text-base mb-2">CI/CD Pipeline — Docker + AWS ECS + GitHub Actions</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {["Docker", "AWS ECS", "GitHub Actions", "CloudWatch"].map(tag => (
              <span key={tag} className="px-3 py-1 bg-white border border-green-200 text-green-700 rounded-full text-xs font-medium">{tag}</span>
            ))}
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            {["Full deployment automation end-to-end", "70% faster release cycles", "CloudWatch monitoring & alerts"].map(item => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Certs + Strengths Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.35 }}
            className="bg-white rounded-2xl p-8 premium-shadow border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-5">
              <Award className="w-5 h-5 text-amber-500" /> Certifications
            </h2>
            <div className="space-y-3">
              {certs.map(cert => (
                <div key={cert.title} className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100/50">
                  {cert.icon}
                  <span className="text-sm text-gray-700 font-medium">{cert.title}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 premium-shadow border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-5">
              <Zap className="w-5 h-5 text-green-500" /> Strengths
            </h2>
            <div className="flex flex-col gap-3">
              {strengths.map(s => (
                <div key={s} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {s}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
