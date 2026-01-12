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
  ChevronRight,
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

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 pt-32 sm:pt-40">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div {...fadeInUp}>

            {/* 标签 - 简约苹果风格 */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-8"
            >
              <span className="text-base sm:text-lg text-gray-500 tracking-wider font-light">
                {companyData.companyInfo.tagline}
              </span>
            </motion.div>

            {/* 主标题 */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {language === 'zh' ? '海南汇融未来' : 'Hainan Huirong Future'}
              </span>
            </motion.h1>

            {/* 副标题 */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl text-gray-700 mb-10 font-medium"
            >
              {companyData.companyInfo.slogan}
            </motion.p>

            {/* 描述 */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
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

            {/* 特性卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: language === 'zh' ? '专业财税团队' : 'Professional Team',
                  desc: language === 'zh' ? '资深注册会计师、税务师' : 'Certified Public Accountants & Tax Agents',
                  color: '#8B2F39'
                },
                {
                  icon: Zap,
                  title: language === 'zh' ? '一站式服务' : 'One-Stop Service',
                  desc: language === 'zh' ? '从注册到运营全流程' : 'Full-process from registration to operation',
                  color: '#6B4C7A'
                },
                {
                  icon: TrendingUp,
                  title: language === 'zh' ? '自贸区优势' : 'Free Trade Zone',
                  desc: language === 'zh' ? '深度了解政策红利' : 'Deep understanding of policy benefits',
                  color: '#C9A872'
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/20"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                    style={{ backgroundColor: feature.color + '15' }}
                  >
                    <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base text-center leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 四大赋能引擎 Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {companyData.empowermentEngines?.title || '四大赋能引擎'}
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {companyData.empowermentEngines?.subtitle || '在这里，服务不是终点，共同成长才是'}
            </p>
          </motion.div>

          {/* 四大赋能引擎概念图 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mb-16"
          >
            <div className="relative w-full max-w-2xl">
              <Image
                src="/images/engines/four-engines-concept.png"
                alt={language === 'zh' ? '四大赋能引擎概念图' : 'Four Empowerment Engines Concept'}
                width={800}
                height={800}
                className="w-full h-auto rounded-2xl shadow-xl"
                priority
                style={{ display: 'block' }}
              />
            </div>
          </motion.div>

          {/* 引擎详情卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyData.empowermentEngines?.engines?.map((engine, index) => {
              const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
                Rocket: Rocket,
                Users: Users,
                Building: Building2,
                Heart: Heart,
              };
              const IconComponent = iconMap[engine.icon] || Rocket;
              
              return (
                <motion.div
                  key={engine.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/20 group"
                >
                  {/* 引擎标题 */}
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: engine.color + '15' }}
                    >
                      <IconComponent className="w-7 h-7" style={{ color: engine.color }} />
                    </div>
                    <div>
                      <span 
                        className="text-sm font-semibold px-3 py-1 rounded-full"
                        style={{ backgroundColor: engine.color + '15', color: engine.color }}
                      >
                        {language === 'zh' ? `引擎 ${engine.id}` : `Engine ${engine.id}`}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
                        {engine.title}
                      </h3>
                    </div>
                  </div>

                  {/* 引擎内容项 */}
                  <div className="space-y-4">
                    {engine.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="pl-4 border-l-3 transition-all hover:pl-6"
                        style={{ borderLeftColor: engine.color }}
                      >
                        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                          <ChevronRight className="w-4 h-4" style={{ color: engine.color }} />
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">
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

      {/* 专业团队 Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
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
            <div className="relative w-full" style={{ minHeight: '400px' }}>
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
            
            {/* 团队信息覆盖层 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
              <div className="flex flex-wrap items-center justify-center gap-8 text-white">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-400">40+</div>
                  <div className="text-sm text-gray-300">{language === 'zh' ? '专业团队成员' : 'Team Members'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-400">10+</div>
                  <div className="text-sm text-gray-300">{language === 'zh' ? '年行业经验' : 'Years Experience'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-400">1000+</div>
                  <div className="text-sm text-gray-300">{language === 'zh' ? '服务企业' : 'Served Enterprises'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-400">98%</div>
                  <div className="text-sm text-gray-300">{language === 'zh' ? '客户满意度' : 'Satisfaction Rate'}</div>
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
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: '🎯', title: language === 'zh' ? '聚力' : 'Focus', subtitle: 'Focus Energy' },
              { icon: '💡', title: language === 'zh' ? '洞见' : 'Insight', subtitle: 'Insight' },
              { icon: '🤝', title: language === 'zh' ? '共创' : 'Co-create', subtitle: 'Co-create' },
              { icon: '🚀', title: language === 'zh' ? '致远' : 'To Distance', subtitle: 'To the Distance' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h4 className="text-xl font-bold text-gray-900">{value.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{value.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
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
