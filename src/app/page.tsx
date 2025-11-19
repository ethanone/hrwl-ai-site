"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Sparkles,
  Cpu,
  HeartPulse,
  Zap,
  PenTool,
  FileText,
  Stethoscope,
  Home,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Users,
  Target,
  Lightbulb,
  Shield,
  Languages,
} from "lucide-react";
import companyDataZh from "@/data/companyData.json";
import companyDataEn from "@/data/companyData.en.json";
import uiTextZh from "@/data/uiText.json";
import uiTextEn from "@/data/uiText.en.json";

// 定义类型
type CompanyData = typeof companyDataZh;
type UIText = typeof uiTextZh;

// 图标映射
const iconMap = {
  Sparkles, Cpu, HeartPulse, Zap, PenTool, FileText, 
  Stethoscope, Home, TrendingUp, Shield, CheckCircle2,
  Users, Target, Lightbulb,
};

// 优化的动画配置 - 更流畅自然
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // 自定义缓动函数
  },
  viewport: { once: true, margin: "-100px" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// 响应式 Section 组件 - 参考 Supima 和 Foundry 的极简大留白设计
const Section = memo(({ children, className = "", id }: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`py-16 sm:py-20 md:py-28 lg:py-36 xl:py-48 px-4 sm:px-6 md:px-8 lg:px-12 ${className}`}>
    <div className="container mx-auto max-w-5xl">
      {children}
    </div>
  </section>
));
Section.displayName = "Section";

// Logo 组件 - 使用真实的 SCXSL logo 图片，移动端优化
const SCXSLLogo = memo(({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={className}>
    <Image
      src="/scxsl-logo.png"
      alt="SCXSL Logo"
      width={48}
      height={48}
      className="w-full h-full object-contain"
      priority
      sizes="(max-width: 768px) 40px, 48px"
      loading="eager"
    />
  </div>
));
SCXSLLogo.displayName = "SCXSLLogo";

// 导航栏组件
const Navigation = memo(({ uiText }: { uiText: UIText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const navItems = [
    { label: uiText.navigation.home, href: "#home" },
    { label: uiText.navigation.about, href: "#about" },
    { label: uiText.navigation.team, href: "#team" },
    { label: uiText.navigation.services, href: "#services" },
    { label: uiText.navigation.cases, href: "#cases" },
    { label: uiText.navigation.contact, href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - 参考 Supima 和 Foundry 的极简设计 */}
          <a 
            href="#home" 
            className="flex items-center space-x-2 md:space-x-3 group focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 rounded"
            aria-label="返回首页"
          >
            <SCXSLLogo className="w-8 h-8 md:w-10 md:h-10 transition-opacity duration-300 group-hover:opacity-70" />
            <span className="text-lg md:text-xl font-light tracking-tight text-black">
              New Shi Long
            </span>
          </a>

          {/* Desktop Navigation - 参考 Supima 和 Foundry 的极简设计 */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs md:text-sm font-light text-gray-700 hover:text-black transition-colors tracking-wider uppercase focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 rounded"
              >
                {item.label}
              </a>
            ))}
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-xs md:text-sm font-light text-gray-700 hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 rounded px-2 py-1"
              title={uiText.navigation.switchLanguage}
              aria-label={uiText.navigation.switchLanguage}
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="text-xs tracking-wider">{language === 'zh' ? 'EN' : '中文'}</span>
            </button>
            <Button className="bg-black text-white hover:bg-gray-900 px-5 py-2 text-xs md:text-sm font-light tracking-wider uppercase focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-all duration-300" asChild>
              <a href={`mailto:uj.zhou@foxmail.com?subject=${encodeURIComponent(language === 'zh' ? '咨询羊肚菌产品,并获取样品' : 'Inquiry about Morel Mushrooms and Request Sample')}`}>
                {uiText.navigation.requestSample}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button - 优化触摸区域 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            aria-label={isOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - 优化的移动端体验 */}
        {isOpen && (
          <>
            {/* 背景遮罩 - 点击关闭 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden py-4 border-t border-gray-200 bg-white relative z-50"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center py-3.5 text-base text-gray-900 hover:text-black hover:bg-gray-50 rounded-lg px-4 mx-2 mb-1 transition-colors active:bg-gray-100 touch-manipulation min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {item.label}
                </a>
              ))}
              {/* Mobile Language Toggle */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 py-3.5 px-4 text-base text-gray-900 hover:text-black hover:bg-gray-50 rounded-lg transition-colors w-full active:bg-gray-100 touch-manipulation min-h-[44px] mx-2 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                aria-label={uiText.navigation.switchLanguage}
              >
                <Languages className="w-5 h-5" />
                <span>{uiText.navigation.switchToEnglish}</span>
              </button>
              <Button className="w-full mt-4 mx-2 tech-button bg-black text-white min-h-[48px] text-base" asChild>
                <a href={`mailto:uj.zhou@foxmail.com?subject=${encodeURIComponent(language === 'zh' ? '咨询羊肚菌产品,并获取样品' : 'Inquiry about Morel Mushrooms and Request Sample')}`}>
                  {uiText.navigation.requestSample}
                </a>
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </nav>
  );
});
Navigation.displayName = "Navigation";

// Hero Section
const HeroSection = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => {
  const { language } = useLanguage();
  return (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24 lg:pt-32 bg-white">
    <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-12 text-center">
      <motion.div {...fadeInUp}>
        {/* 参考 Supima 的极简设计 - 小标签 + 超大标题 */}
        <p className="mb-4 md:mb-6 text-gray-500 font-light text-xs md:text-sm tracking-[0.15em] uppercase">
          {companyData.companyInfo.founded && `${language === 'zh' ? '成立于' : 'Founded in'} ${companyData.companyInfo.founded} · `}{companyData.companyInfo.tagline}
        </p>
        
        {/* 超大标题 - 参考 Supima 的极简风格 */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight mb-8 md:mb-12 lg:mb-16 leading-[0.95] tracking-[-0.02em] text-black">
          {companyData.companyInfo.slogan}
        </h1>
        
        {/* 副标题 - 更简洁 */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-[1.6]">
          {companyData.companyInfo.name}{language === 'zh' ? '专注于' : ' focuses on '}{companyData.companyInfo.focus}
        </p>
        
        {/* 描述文字 - 更小更精致 */}
        <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-12 md:mb-16 max-w-xl mx-auto font-light leading-[1.7]">
          {companyData.aboutUs.mission}
        </p>
        
        {/* 参考 Supima 和 Foundry 的极简按钮设计 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-black text-white hover:bg-gray-900 px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-light tracking-wider uppercase focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-all duration-300 w-full sm:w-auto min-h-[48px] touch-manipulation" 
            asChild
          >
            <a href="#services" aria-label={uiText.hero.learnMore}>
              {uiText.hero.learnMore}
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border border-black text-black hover:bg-black hover:text-white px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-light tracking-wider uppercase focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 transition-all duration-300 w-full sm:w-auto min-h-[48px] touch-manipulation" 
            asChild
          >
            <a href="#contact" aria-label={uiText.hero.contactUs}>
              {uiText.hero.contactUs}
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
    
    {/* 简洁的滚动指示器 */}
    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
      <ChevronRight className="w-5 h-5 text-gray-400 rotate-90 animate-bounce" />
    </div>
  </section>
  );
});
HeroSection.displayName = "HeroSection";

// Focus Areas Section
const FocusAreasSection = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => (
  <Section className="bg-white">
    <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20 lg:mb-24">
      <p className="mb-4 md:mb-6 text-gray-500 font-light text-xs md:text-sm tracking-[0.15em] uppercase">
        {uiText.focusAreas.badge}
      </p>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight mb-8 md:mb-12 tracking-[-0.02em] text-black leading-[0.95]">
        {uiText.focusAreas.title}<span className="text-black">{uiText.focusAreas.titleHighlight}</span>
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-[1.7]">
        {uiText.focusAreas.subtitle}
      </p>
    </motion.div>

    <motion.div 
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
    >
      {companyData.focusAreas.map((area, index) => {
        const Icon = iconMap[area.icon as keyof typeof iconMap] || Sparkles;
        return (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="group h-full bg-white border-0 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <CardHeader className="pb-6">
                <div 
                  className="w-10 h-10 mb-6 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-70"
                >
                  <Icon className="w-5 h-5 text-black" />
                </div>
                <CardTitle className="text-base md:text-lg font-light text-black mb-4 tracking-tight">
                  {area.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-[1.7] font-light text-sm md:text-base">{area.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  </Section>
));
FocusAreasSection.displayName = "FocusAreasSection";

// About Section - 参考 Supima 的极简设计
const AboutSection = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => (
  <Section id="about" className="bg-white">
    <div className="max-w-4xl mx-auto">
      <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20">
        <p className="mb-4 md:mb-6 text-gray-500 font-light text-xs md:text-sm tracking-[0.15em] uppercase">
          {uiText.about.badge}
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight mb-12 md:mb-16 tracking-[-0.02em] text-black leading-[0.95]">
          {uiText.about.title}<span className="text-black">{companyData.companyInfo.focus}</span>
        </h2>
        <div className="space-y-6 md:space-y-8 text-gray-600 leading-[1.7] text-left text-base md:text-lg font-light">
          {companyData.aboutUs.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        <div className="mt-16 md:mt-20 space-y-10 md:space-y-12">
          <div className="flex items-start space-x-6 text-left">
            <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-light text-black mb-3 text-base md:text-lg tracking-tight">{uiText.about.coreGoal}</h4>
              <p className="text-gray-600 font-light text-sm md:text-base leading-[1.7]">{companyData.aboutUs.mission}</p>
            </div>
          </div>
          <div className="flex items-start space-x-6 text-left">
            <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-light text-black mb-3 text-base md:text-lg tracking-tight">{uiText.about.vision}</h4>
              <p className="text-gray-600 font-light text-sm md:text-base leading-[1.7]">{companyData.aboutUs.vision}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </Section>
));
AboutSection.displayName = "AboutSection";

// Core Advantages Section - 参考 Foundry 的极简设计
const AdvantagesSection = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => (
  <Section id="services" className="bg-white">
    <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20 lg:mb-24">
      <p className="mb-4 md:mb-6 text-gray-500 font-light text-xs md:text-sm tracking-[0.15em] uppercase">
        {uiText.advantages.badge}
      </p>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight mb-8 md:mb-12 tracking-[-0.02em] text-black leading-[0.95]">
        {uiText.advantages.title}<span className="text-black">{uiText.advantages.titleHighlight}</span>
      </h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {companyData.coreAdvantages.map((advantage, index) => {
        const Icon = iconMap[advantage.icon as keyof typeof iconMap] || Sparkles;
        return (
          <motion.div
            key={index}
            {...fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full bg-white border-0">
              <CardHeader>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="w-4 h-4 text-black" />
                  </div>
                  <CardTitle className="text-lg md:text-xl font-light text-black tracking-tight">{advantage.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-[1.7] mb-6 font-light text-sm md:text-base">{advantage.description}</p>
                <div className="flex flex-wrap gap-2">
                  {advantage.highlights.map((highlight, idx) => (
                    <span key={idx} className="text-xs text-gray-500 font-light border-0">
                      {highlight}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  </Section>
));
AdvantagesSection.displayName = "AdvantagesSection";

// Team Section - 参考 Supima 的极简团队展示
const TeamSection = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => (
  <Section id="team" className="bg-white">
    <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20 lg:mb-24">
      <p className="mb-4 md:mb-6 text-gray-500 font-light text-xs md:text-sm tracking-[0.15em] uppercase">
        {uiText.team.badge}
      </p>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight mb-8 md:mb-12 tracking-[-0.02em] text-black leading-[0.95]">
        {uiText.team.title}<span className="text-black">{uiText.team.titleHighlight}</span>
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-[1.7]">
        {companyData.team.intro}
      </p>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {companyData.team.leadership.map((member, index) => (
        <motion.div
          key={index}
          {...fadeInUp}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="tech-card group text-center h-full bg-white border border-gray-200">
            <CardHeader>
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Users className="w-12 h-12 text-black" />
              </div>
              <CardTitle className="text-lg font-normal mb-2 text-black">{member.name}</CardTitle>
              <CardDescription className="text-gray-600 font-light text-sm">
                {member.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed font-light">{member.background}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {member.expertise.slice(0, 3).map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs font-light border-gray-300 text-gray-600">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </Section>
));
TeamSection.displayName = "TeamSection";

// Case Studies Section - 参考 Foundry 的极简案例展示
const CaseStudiesSection = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => (
  <Section id="cases" className="bg-white">
    <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20 lg:mb-24">
      <p className="mb-4 md:mb-6 text-gray-500 font-light text-xs md:text-sm tracking-[0.15em] uppercase">
        {uiText.cases.badge}
      </p>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight mb-8 md:mb-12 tracking-[-0.02em] text-black leading-[0.95]">
        <span className="text-black">{uiText.cases.title}</span>{uiText.cases.titleHighlight}
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-[1.7]">
        {uiText.cases.subtitle}
      </p>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      {companyData.caseStudies.map((caseStudy, index) => {
        return (
          <motion.div
            key={caseStudy.id}
            {...fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group h-full overflow-hidden bg-white border-0">
              <CardHeader>
                <div className="mb-6">
                  <p className="mb-2 text-xs text-gray-500 font-light tracking-wider uppercase">
                    {caseStudy.category}
                  </p>
                  <CardTitle className="text-lg md:text-xl font-light mb-3 text-black tracking-tight">
                    {caseStudy.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm md:text-base font-light leading-[1.7]">
                    {caseStudy.subtitle}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Technologies */}
                <div>
                  <h4 className="font-light text-xs text-gray-500 mb-3 tracking-wider uppercase">{uiText.cases.technologies}</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs text-gray-500 font-light">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pain Point (if exists) */}
                {caseStudy.painPoint && (
                  <div className="border-l-2 border-gray-200 pl-4">
                    <p className="text-sm text-gray-600 font-light leading-[1.7]">
                      <span className="font-light text-gray-500">{uiText.cases.painPoint}</span> {caseStudy.painPoint}
                    </p>
                  </div>
                )}

                {/* Features */}
                <div>
                  <h4 className="font-light text-xs text-gray-500 mb-3 tracking-wider uppercase">{uiText.cases.features}</h4>
                  <Accordion type="single" collapsible>
                    {caseStudy.features.map((feature, idx) => (
                      <AccordionItem key={idx} value={`feature-${idx}`} className="border-0">
                        <AccordionTrigger className="text-sm font-light text-black hover:no-underline">
                          {feature.name}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-600 leading-[1.7] font-light">
                          {feature.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Outcome */}
                <div className="border-l-2 border-black pl-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-light text-sm text-black mb-2 tracking-tight">{uiText.cases.outcome}</h4>
                      <p className="text-sm text-gray-600 leading-[1.7] font-light">{caseStudy.outcome}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  </Section>
));
CaseStudiesSection.displayName = "CaseStudiesSection";

// Contact Section
const ContactSection = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => {
  const { language } = useLanguage();
  
  return (
  <Section id="contact" className="bg-white">
    <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20 lg:mb-24">
      <p className="mb-4 md:mb-6 text-gray-500 font-light text-xs md:text-sm tracking-[0.15em] uppercase">
        {uiText.contact.badge}
      </p>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight mb-8 md:mb-12 tracking-[-0.02em] text-black leading-[0.95]">
        {uiText.contact.title}<span className="text-black">{uiText.contact.titleHighlight}</span>{uiText.contact.titleSuffix}
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-[1.7]">
        {uiText.contact.subtitle}
      </p>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Info */}
      <motion.div {...fadeInUp} className="space-y-6">
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-light text-xs text-gray-500 mb-2 tracking-wider uppercase">{uiText.contact.phoneLabel}</h4>
              <a href={`tel:${companyData.contact.phone}`} className="text-black hover:text-gray-600 font-light text-base md:text-lg transition-colors">
                {companyData.contact.phone}
              </a>
              <p className="text-xs text-gray-500 mt-1 font-light">{companyData.contact.workingHours}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-light text-xs text-gray-500 mb-2 tracking-wider uppercase">{uiText.contact.emailLabel}</h4>
              <a href={`mailto:${companyData.contact.email}?subject=${encodeURIComponent(language === 'zh' ? '咨询羊肚菌产品' : 'Inquiry about Morel Mushrooms')}`} className="text-black hover:text-gray-600 font-light text-base md:text-lg transition-colors">
                {companyData.contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-light text-xs text-gray-500 mb-2 tracking-wider uppercase">{uiText.contact.addressLabel}</h4>
              <p className="text-gray-600 text-sm md:text-base font-light leading-[1.7]">
                {companyData.contact.address}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black text-white p-8 md:p-12">
          <h3 className="text-xl md:text-2xl font-light mb-4 tracking-tight">{companyData.companyInfo.slogan}</h3>
          <p className="mb-8 opacity-80 text-sm md:text-base font-light leading-[1.7]">
            {companyData.aboutUs.vision}
          </p>
          <Button size="lg" className="w-full bg-white text-black hover:bg-gray-100 px-8 py-3 text-sm font-light tracking-wider uppercase transition-all duration-300" asChild>
            <a href={`mailto:${companyData.contact.email}?subject=${encodeURIComponent(language === 'zh' ? '咨询羊肚菌产品与合作' : 'Inquiry about Morel Mushrooms & Cooperation')}`}>
              {uiText.contact.cta}
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Company Values */}
      <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
        <h3 className="text-lg md:text-xl font-light mb-8 tracking-tight">{uiText.contact.values}</h3>
        <div className="space-y-6">
          {companyData.aboutUs.values.map((value, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
              <h4 className="text-base md:text-lg font-light text-black leading-[1.7]">{value}</h4>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h4 className="font-light text-sm text-gray-500 mb-6 tracking-wider uppercase">{uiText.contact.advisors}</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-600 font-light leading-[1.7]">{companyData.team.teamSize.advisors.medical}</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-600 font-light leading-[1.7]">{companyData.team.teamSize.advisors.power}</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-600 font-light leading-[1.7]">{companyData.team.teamSize.advisors.design}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </Section>
  );
});
ContactSection.displayName = "ContactSection";

// Footer - 参考 Supima 和 Foundry 的极简 Footer
const Footer = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => (
  <footer className="bg-white border-t border-gray-100 py-12 md:py-16">
    <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10 md:mb-12">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Image
              src="/scxsl-logo.png"
              alt="New Shi Long Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-base font-light tracking-tight text-black">New Shi Long</span>
          </div>
          <p className="text-gray-500 text-xs md:text-sm font-light leading-[1.7]">
            {companyData.companyInfo.slogan}
          </p>
        </div>

        <div>
          <h4 className="font-light text-xs text-gray-500 mb-4 tracking-wider uppercase">{uiText.footer.quickLinks}</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#about" className="hover:text-black transition-colors font-light">{uiText.footer.about}</a></li>
            <li><a href="#team" className="hover:text-black transition-colors font-light">{uiText.footer.team}</a></li>
            <li><a href="#services" className="hover:text-black transition-colors font-light">{uiText.footer.services}</a></li>
            <li><a href="#cases" className="hover:text-black transition-colors font-light">{uiText.footer.cases}</a></li>
            <li><a href="#contact" className="hover:text-black transition-colors font-light">{uiText.footer.contact}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-light text-xs text-gray-500 mb-4 tracking-wider uppercase">{uiText.footer.contactInfo}</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2 font-light">
              <Phone className="w-3.5 h-3.5" />
              <span>{companyData.contact.phone}</span>
            </li>
            <li className="flex items-center space-x-2 font-light">
              <Mail className="w-3.5 h-3.5" />
              <span>{companyData.contact.email}</span>
            </li>
            <li className="flex items-start space-x-2 font-light">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>{companyData.contact.addressShort}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6 md:pt-8 text-center text-xs text-gray-400 font-light">
        <p>© {new Date().getFullYear()} {companyData.companyInfo.name}. {uiText.footer.allRightsReserved}</p>
        <p className="mt-1">{uiText.footer.foundedIn} {companyData.companyInfo.founded} · {uiText.footer.focusOn}</p>
      </div>
    </div>
  </footer>
));
Footer.displayName = "Footer";

// Main Page Component
export default function HomePage() {
  const { language } = useLanguage();
  const [companyData, setCompanyData] = useState<CompanyData>(companyDataZh);
  const [uiText, setUiText] = useState<UIText>(uiTextZh);

  useEffect(() => {
    setCompanyData(language === 'zh' ? companyDataZh : (companyDataEn as unknown as CompanyData));
    setUiText(language === 'zh' ? uiTextZh : (uiTextEn as unknown as UIText));
  }, [language]);

  return (
    <main className="min-h-screen">
      <Navigation uiText={uiText} />
      <HeroSection companyData={companyData} uiText={uiText} />
      <FocusAreasSection companyData={companyData} uiText={uiText} />
      <AboutSection companyData={companyData} uiText={uiText} />
      <AdvantagesSection companyData={companyData} uiText={uiText} />
      <TeamSection companyData={companyData} uiText={uiText} />
      <CaseStudiesSection companyData={companyData} uiText={uiText} />
      <ContactSection companyData={companyData} uiText={uiText} />
      <Footer companyData={companyData} uiText={uiText} />
    </main>
  );
}

