"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChatModal } from "@/components/ChatModal";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { ProjectModal } from "@/components/ProjectModal";
import { motion } from "framer-motion";
import {
  Languages,
  Bot,
  Zap,
  TrendingUp,
  Clock,
  Rocket,
  Users,
  Building2,
  Heart,
  Target,
  Eye,
  Handshake,
  Compass,
  Ear,
  Anchor,
  Lightbulb,
  MapPin,
  Phone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Network,
} from "lucide-react";
import companyDataZh from "@/data/companyData.json";
import companyDataEn from "@/data/companyData.en.json";
import uiTextZh from "@/data/uiText.json";
import uiTextEn from "@/data/uiText.en.json";

// 定义类型
type CompanyData = typeof companyDataZh;
type UIText = typeof uiTextZh;

// 优化的动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
  },
  viewport: { once: true, margin: "0px" },
};

// 语言切换按钮组件
const LanguageToggle = memo(({ uiText }: { uiText: UIText }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      title={uiText.navigation.switchLanguage}
    >
      <Languages className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-gray-700">{language === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );
});
LanguageToggle.displayName = "LanguageToggle";

// 主页面组件
export default function HomePage() {
  const { language } = useLanguage();
  const companyData = language === 'zh' ? companyDataZh : (companyDataEn as unknown as CompanyData);
  const uiText = language === 'zh' ? uiTextZh : (uiTextEn as unknown as UIText);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* 顶部导航栏 - Logo在左上角 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - 左上角 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center"
            >
              <div className="relative h-12 sm:h-14 md:h-16 w-auto">
                <Image
                  src="/images/logo.png"
                  alt="海南汇融未来有限公司"
                  width={320}
                  height={322}
                  className="object-contain h-full w-auto"
                  priority
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 200px"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <LanguageToggle uiText={uiText} />
      
      {/* 聊天模态框 */}
      <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
      
      {/* 项目简介模态框 */}
      <ProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} language={language} />
      
      {/* 浮动聊天按钮 */}
      <FloatingChatButton onClick={() => setIsChatModalOpen(true)} />

      {/* Hero Section - 增强艺术感 */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 pt-32 sm:pt-40 relative overflow-hidden">
        {/* 艺术背景装饰 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/3 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div {...fadeInUp}>

            {/* 标签 - 科技感设计，增强艺术感 */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-3 mb-8 px-6 py-3 bg-gradient-to-r from-gray-900/5 via-primary/10 to-gray-900/5 rounded-full border border-gray-200/50 backdrop-blur-sm shadow-lg"
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full w-2 h-2 bg-gradient-to-r from-primary to-accent"></span>
              </span>
              <span className="text-sm sm:text-base text-gray-600 tracking-[0.2em] uppercase font-medium">
                {companyData.companyInfo.tagline}
              </span>
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full w-2 h-2 bg-gradient-to-r from-accent to-primary"></span>
              </span>
            </motion.div>

            {/* 主标题 - 科技感字体 */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.05] tracking-tight"
            >
              <span className="tech-title-gradient">
                {language === 'zh' ? '海南汇融未来' : 'Hainan Huirong Future'}
              </span>
            </motion.h1>

            {/* 副标题 - 科技感文字 */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 mb-10 font-semibold tracking-wide"
            >
              {companyData.companyInfo.slogan}
            </motion.p>

            {/* 描述 - 科技感排版 */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-gray-500 mb-16 max-w-4xl mx-auto leading-relaxed font-light tracking-wide"
              style={{ textShadow: '0 0 40px rgba(139, 47, 47, 0.1)' }}
            >
              {companyData.companyInfo.subtitle}
            </motion.p>

            {/* CTA 按钮 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            >
              <Button 
                size="lg" 
                onClick={() => setIsChatModalOpen(true)}
                className="cta-button px-12 py-7 text-lg font-semibold tracking-wide w-full sm:w-auto min-h-[64px] shadow-xl hover:shadow-2xl transition-all"
              >
                <Bot className="w-6 h-6 mr-3" />
                {language === 'zh' ? '开始咨询' : 'Start Consulting'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setIsProjectModalOpen(true)}
                className="secondary-button px-12 py-7 text-lg font-semibold tracking-wide w-full sm:w-auto min-h-[64px] border-2"
              >
                {language === 'zh' ? '了解更多' : 'Learn More'}
              </Button>
            </motion.div>

            {/* 特性卡片 - 增强艺术感 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: language === 'zh' ? '专业财税团队' : 'Professional Team',
                  desc: language === 'zh' ? '资深注册会计师、税务师' : 'Certified Public Accountants & Tax Agents',
                  color: '#8B2F39',
                  gradient: 'from-red-50 to-rose-50'
                },
                {
                  icon: Zap,
                  title: language === 'zh' ? '一站式服务' : 'One-Stop Service',
                  desc: language === 'zh' ? '从注册到运营全流程' : 'Full-process from registration to operation',
                  color: '#6B4C7A',
                  gradient: 'from-purple-50 to-violet-50'
                },
                {
                  icon: TrendingUp,
                  title: language === 'zh' ? '自贸区优势' : 'Free Trade Zone',
                  desc: language === 'zh' ? '深度了解政策红利' : 'Deep understanding of policy benefits',
                  color: '#C9A872',
                  gradient: 'from-amber-50 to-yellow-50'
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`group relative bg-gradient-to-br ${feature.gradient} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden`}
                >
                  {/* 悬浮光效 */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${feature.color}15, transparent 70%)` }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg"
                      style={{ backgroundColor: feature.color + '20', boxShadow: `0 4px 20px ${feature.color}30` }}
                    >
                      <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center group-hover:scale-105 transition-transform">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-base text-center leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  {/* 装饰线条 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity" style={{ color: feature.color }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 汇融未来商务考察 Section - 核心业务板块，增强艺术感 */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* 艺术背景 - 多层次渐变 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>
        
        {/* 浮动装饰元素 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary tracking-wide">
                {language === 'zh' ? '核心业务' : 'Core Business'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {companyData.businessInspection?.title || '"汇融未来"商务考察'}
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-3">
              {companyData.businessInspection?.subtitle || '企业入驻海南自贸港的十大核心优势'}
            </p>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">
              {companyData.businessInspection?.description || '我们深度对接13大重点园区，为您定制考察动线。'}
            </p>
          </motion.div>

          {/* 13大园区核心数字 - 增强艺术感 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="relative group">
              {/* 外圈光晕 */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
              
              {/* 主卡片 */}
              <div className="relative bg-gradient-to-br from-primary via-secondary to-accent p-[2px] rounded-2xl">
                <div className="bg-white rounded-2xl px-12 py-8 flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                      {companyData.businessInspection?.parkCount || '13'}
                    </div>
                    <div className="text-gray-600 font-medium mt-2 text-sm tracking-wide">
                      {companyData.businessInspection?.parkLabel || '大重点园区深度对接'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 四大体验 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-xl font-bold text-center mb-8 text-gray-800">
              {language === 'zh' ? '您将：' : 'You Will:'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {companyData.businessInspection?.experiences?.map((exp, index) => {
                const renderExpIcon = () => {
                  const iconProps = { className: "w-7 h-7", style: { color: exp.color } };
                  switch (exp.icon) {
                    case 'Eye': return <Eye {...iconProps} />;
                    case 'Ear': return <Ear {...iconProps} />;
                    case 'Target': return <Target {...iconProps} />;
                    case 'Handshake': return <Handshake {...iconProps} />;
                    default: return <Eye {...iconProps} />;
                  }
                };
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group relative bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent overflow-hidden"
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${exp.color}10 0%, transparent 100%)` }}
                    />
                    <div className="relative z-10">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: exp.color + '15' }}
                      >
                        {renderExpIcon()}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{exp.title}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{exp.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* 13大重点园区展示 - 地图可视化 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-6 sm:p-10">
              {/* 背景装饰 */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.3),transparent_50%)]" />
              </div>

              {/* 标题 */}
              <div className="text-center mb-8 relative z-10">
                <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3">
                  {language === 'zh' ? '海南自贸港 13 大重点园区' : 'Hainan FTP 13 Key Industrial Parks'}
                </h3>
                <p className="text-gray-600 text-lg font-medium">
                  {language === 'zh' ? '全岛产业布局 · 深度对接服务' : 'Island-wide Industrial Layout · Deep Connection Service'}
                </p>
              </div>

              {/* 地图容器 - 响应式布局 */}
              <div className="relative">
                {/* 主地图 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 backdrop-blur-sm"
                >
                  <Image
                    src="/images/hainan-ftp-parks-map.jpg"
                    alt={language === 'zh' ? '海南自贸港全岛产业园区分布图' : 'Hainan FTP Industrial Parks Distribution Map'}
                    width={1200}
                    height={900}
                    className="w-full h-auto"
                    priority
                  />
                  
                  {/* 地图上的浮动信息卡片 */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* 左上角 - 海口区域卡片 */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="absolute top-[8%] right-[8%] bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-blue-200/50 max-w-[200px]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse" />
                        <h4 className="font-bold text-gray-800 text-sm">
                          {language === 'zh' ? '海口核心区' : 'Haikou Core Area'}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {language === 'zh' ? '5大重点园区聚集，打造自贸港核心引擎' : '5 key parks, FTP core engine'}
                      </p>
                    </motion.div>

                    {/* 右下角 - 三亚区域卡片 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="absolute bottom-[15%] left-[8%] bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-cyan-200/50 max-w-[200px]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 animate-pulse" />
                        <h4 className="font-bold text-gray-800 text-sm">
                          {language === 'zh' ? '三亚创新区' : 'Sanya Innovation Zone'}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {language === 'zh' ? '科技城+中央商务区，双轮驱动发展' : 'Tech city + CBD, dual-drive growth'}
                      </p>
                    </motion.div>

                    {/* 中部 - 特色园区卡片 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="absolute top-[45%] right-[5%] bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-teal-200/50 max-w-[220px]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 animate-pulse" />
                        <h4 className="font-bold text-gray-800 text-sm">
                          {language === 'zh' ? '博鳌乐城' : 'Boao Lecheng'}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {language === 'zh' ? '国际医疗旅游先行区，生命科技新高地' : 'Medical tourism pioneer zone'}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* 地图下方 - 园区网格列表（折叠式） */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
                >
                  {[
                    { name: '海口高新区', icon: '🚀', color: 'from-blue-500 to-cyan-500' },
                    { name: '复兴城产业园', icon: '💻', color: 'from-cyan-500 to-teal-500' },
                    { name: '江东新区', icon: '🏗️', color: 'from-teal-500 to-emerald-500' },
                    { name: '综合保税区', icon: '📦', color: 'from-emerald-500 to-green-500' },
                    { name: '生态软件园', icon: '🌱', color: 'from-green-500 to-lime-500' },
                    { name: '临高产业园', icon: '⚓', color: 'from-sky-500 to-blue-500' },
                    { name: '洋浦开发区', icon: '🏭', color: 'from-indigo-500 to-purple-500' },
                    { name: '东方产业园', icon: '⚡', color: 'from-purple-500 to-pink-500' },
                    { name: '三亚中央商务区', icon: '🏢', color: 'from-pink-500 to-rose-500' },
                    { name: '崖州湾科技城', icon: '🔬', color: 'from-rose-500 to-red-500' },
                    { name: '博鳌乐城', icon: '🏥', color: 'from-amber-500 to-orange-500' },
                    { name: '陵水教育创新区', icon: '🎓', color: 'from-orange-500 to-yellow-500' },
                    { name: '文昌航天城', icon: '🚀', color: 'from-violet-500 to-purple-500' },
                  ].map((park, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.03, duration: 0.3 }}
                      viewport={{ once: true }}
                      className="group relative overflow-hidden bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent cursor-pointer"
                    >
                      {/* 渐变背景 - 悬浮时显示 */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${park.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="relative z-10 flex items-center gap-2">
                        <span className="text-xl group-hover:scale-110 transition-transform">{park.icon}</span>
                        <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                          {park.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* 底部说明文字 */}
              <p className="text-center text-gray-500 mt-6 text-sm relative z-10">
                {language === 'zh' ? '🗺️ 海南自贸港全岛产业园区分布 · 深度对接13大重点园区' : '🗺️ Hainan FTP Industrial Parks Distribution'}
              </p>
            </div>
          </motion.div>

          {/* 考察旅程四大主题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-xl font-bold text-center mb-8 text-gray-800">
              {language === 'zh' ? '考察旅程' : 'Inspection Journey'}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {companyData.businessInspection?.journeyThemes?.map((theme, index) => {
                const renderThemeIcon = () => {
                  const iconProps = { className: "w-8 h-8 text-white" };
                  switch (theme.icon) {
                    case 'Compass': return <Compass {...iconProps} />;
                    case 'Anchor': return <Anchor {...iconProps} />;
                    case 'Lightbulb': return <Lightbulb {...iconProps} />;
                    case 'Heart': return <Heart {...iconProps} />;
                    default: return <Compass {...iconProps} />;
                  }
                };
                return (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-xl"
                  >
                    <div 
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, ${theme.color} 0%, ${theme.color}CC 100%)` }}
                    />
                    <div className="relative z-10 p-5 text-white min-h-[180px]">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                        {renderThemeIcon()}
                      </div>
                      <h4 className="text-lg font-bold mb-0.5">{theme.title}</h4>
                      <p className="text-white/80 text-sm mb-2">{theme.subtitle}</p>
                      <p className="text-white/60 text-xs leading-relaxed line-clamp-2">{theme.description}</p>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* 核心优势（十大优势） */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-xl font-bold text-center mb-8 text-gray-800">
              {language === 'zh' ? '企业入驻海南自贸港十大核心优势' : 'Top 10 Core Advantages of Settling in Hainan FTP'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {companyData.businessInspection?.coreAdvantages?.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed group-hover:text-gray-900 transition-colors">
                    {advantage}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 四大链接 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {language === 'zh' ? '汇融未来 · 企程海南' : 'Huirong Future · Enterprise Hainan'}
              </h3>
              <p className="text-gray-500 text-sm">
                {language === 'zh' ? '全方位链接，助力企业腾飞' : 'All-round Connection, Empowering Enterprises'}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {companyData.businessInspection?.connections?.map((conn, index) => {
                const renderConnIcon = () => {
                  const iconProps = { className: "w-5 h-5", style: { color: conn.color } };
                  switch (conn.icon) {
                    case 'TrendingUp': return <TrendingUp {...iconProps} />;
                    case 'Users': return <Users {...iconProps} />;
                    case 'Network': return <Network {...iconProps} />;
                    case 'Rocket': return <Rocket {...iconProps} />;
                    default: return <Sparkles {...iconProps} />;
                  }
                };
                return (
                  <motion.div
                    key={conn.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all border border-gray-100"
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: conn.color + '20' }}
                    >
                      {renderConnIcon()}
                    </div>
                    <span className="font-medium text-gray-800 text-sm">{conn.title}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Slogan & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-lg sm:text-xl text-gray-700 italic mb-6 max-w-3xl mx-auto">
              &ldquo;{companyData.businessInspection?.slogan || '让我们帮您把复杂的信息碎片，拼成一幅清晰的作战地图。'}&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a 
                href={`tel:${companyData.contact?.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{companyData.contact?.hotline || '海南自贸港启航热线'}: {companyData.contact?.phone}</span>
              </a>
              <Button 
                size="lg" 
                onClick={() => setIsChatModalOpen(true)}
                className="cta-button px-6 py-3 font-semibold rounded-full text-sm"
              >
                <Bot className="w-4 h-4 mr-2" />
                {language === 'zh' ? '预约商务考察' : 'Book Inspection Tour'}
              </Button>
            </div>
            <p className="mt-4 text-gray-500 flex items-center justify-center gap-2 text-xs">
              <MapPin className="w-3 h-3" />
              {companyData.contact?.address}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 专业团队 Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {language === 'zh' ? '专业团队' : 'Professional Team'}
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'zh' 
                ? '汇融未来拥有一支经验丰富、专业高效的团队，为您提供全方位的企业服务' 
                : 'Huirong Future has an experienced and professional team to provide you with comprehensive enterprise services'}
            </p>
          </motion.div>

          {/* 团队照片 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-gray-800 to-gray-900"
          >
            <div className="relative w-full">
              <Image
                src="/images/team/team-photo.jpg"
                alt={language === 'zh' ? '汇融未来团队' : 'Huirong Future Team'}
                width={2882}
                height={604}
                className="w-full h-auto object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
                style={{ display: 'block' }}
              />
              {/* 装饰边框 - 金色边框效果 */}
              <div className="absolute inset-0 border-4 border-yellow-500/80 rounded-3xl pointer-events-none" />
              <div className="absolute inset-2 border border-yellow-500/30 rounded-2xl pointer-events-none" />
            </div>
            
            {/* 团队信息覆盖层 - 贴近图片底部 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-white">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">40+</div>
                  <div className="text-xs sm:text-sm text-gray-300">{language === 'zh' ? '专业团队成员' : 'Team Members'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">10+</div>
                  <div className="text-xs sm:text-sm text-gray-300">{language === 'zh' ? '年行业经验' : 'Years Experience'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">1000+</div>
                  <div className="text-xs sm:text-sm text-gray-300">{language === 'zh' ? '服务企业' : 'Served Enterprises'}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 核心价值观 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {[
              { Icon: Target, title: language === 'zh' ? '聚力' : 'Focus', subtitle: 'Focus Energy', color: '#8B2F39' },
              { Icon: Eye, title: language === 'zh' ? '洞见' : 'Insight', subtitle: 'Insight', color: '#1E40AF' },
              { Icon: Handshake, title: language === 'zh' ? '共创' : 'Co-create', subtitle: 'Co-create', color: '#059669' },
              { Icon: Compass, title: language === 'zh' ? '致远' : 'To Distance', subtitle: 'To the Distance', color: '#C9A872' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 group"
              >
                <div 
                  className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: value.color + '15' }}
                >
                  <value.Icon className="w-7 h-7" style={{ color: value.color }} />
                </div>
                <h4 className="text-lg font-bold text-gray-900">{value.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{value.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 四大赋能引擎 Section - 紧凑排版 */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          {/* 标题和图片并排显示，更紧凑 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10"
          >
            {/* 概念图 - 左侧 */}
            <div className="relative w-[140px] sm:w-[160px] flex-shrink-0">
              <Image
                src="/images/engines/four-engines-concept.png"
                alt={language === 'zh' ? '四大赋能引擎概念图' : 'Four Empowerment Engines Concept'}
                width={160}
                height={160}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* 标题 - 右侧 */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {companyData.empowermentEngines?.title || '四大赋能引擎'}
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-xl">
                {companyData.empowermentEngines?.subtitle || '在这里，服务不是终点，共同成长才是'}
              </p>
            </div>
          </motion.div>

          {/* 引擎详情卡片 - 2x2 网格，更紧凑 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companyData.empowermentEngines?.engines?.map((engine, index) => {
              const renderIcon = () => {
                const iconProps = { className: "w-5 h-5", style: { color: engine.color } };
                switch (engine.icon) {
                  case 'Rocket': return <Rocket {...iconProps} />;
                  case 'Users': return <Users {...iconProps} />;
                  case 'Building': return <Building2 {...iconProps} />;
                  case 'Heart': return <Heart {...iconProps} />;
                  default: return <Rocket {...iconProps} />;
                }
              };
              
              return (
                <motion.div
                  key={engine.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: engine.color + '15' }}
                    >
                      {renderIcon()}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900">
                      {engine.title}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {engine.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="pl-2.5 border-l-2 transition-all hover:pl-3"
                        style={{ borderLeftColor: engine.color }}
                      >
                        <h4 className="font-semibold text-gray-800 text-xs flex items-center gap-1">
                          <span style={{ color: engine.color }}>›</span>
                          {item.name}
                        </h4>
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 品牌宣言 Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed">
              {language === 'zh' 
                ? '"在这里，服务不是终点，共同成长才是"' 
                : '"Here, service is not the end, growing together is"'}
            </h3>
            <p className="text-lg text-white/80 mb-8">
              {language === 'zh' 
                ? '海南汇融未来 — 您值得信赖的企业成长伙伴' 
                : 'Hainan Huirong Future — Your Trusted Enterprise Growth Partner'}
            </p>
            <Button 
              size="lg" 
              onClick={() => setIsChatModalOpen(true)}
              className="bg-white text-primary hover:bg-gray-100 px-10 py-6 text-lg font-semibold shadow-xl"
            >
              <Bot className="w-5 h-5 mr-2" />
              {language === 'zh' ? '立即咨询' : 'Consult Now'}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {companyData.companyInfo.name}. {language === 'zh' ? '版权所有' : 'All rights reserved.'}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          {companyData.companyInfo.focus}
        </p>
      </footer>
    </main>
  );
}
