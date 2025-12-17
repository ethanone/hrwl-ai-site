"use client";

import { memo, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'zh' | 'en';
}

export const ProjectModal = memo(({ isOpen, onClose, language }: ProjectModalProps) => {
  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC 键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const content = language === 'zh' ? {
    title: "项目简介｜ PM系列智能体-工时定额管理智能体",
    sections: [
      {
        title: "项目简介",
        content: "工时定额管理智能体是一款面向制造业工程师与精益团队的工业工程智能分析系统。它以标准工时为核心，融合工时测定、动作分析、人机协作、OEE 计算与产线平衡等工业工程方法，通过交互式对话 + 自动分析的方式，帮助企业快速、可靠地完成工序分析与定额设计。",
        content2: "不同于传统依赖 Excel、经验判断或专家驻场的方式，清风将工业工程的专业逻辑系统化、流程化、智能化，让标准工时和效率分析可复用、可追溯、可评估。"
      },
      {
        title: "我们解决什么问题？",
        content: "在实际制造现场，工程师普遍面临以下痛点：",
        list: [
          "工时测定高度依赖个人经验，结果难以复核",
          "动作分析、人机分析、OEE、产线平衡分散在不同工具中",
          "数据不完整、不精确，导致分析结论可信度不足",
          "分析过程不可追溯，难以形成组织级方法论",
          "定额制定缺乏统一标准，易引发管理争议"
        ],
        footer: "清风的目标，是让工业工程分析从\"经验驱动\"走向\"规则驱动 + 数据驱动\"。"
      },
      {
        title: "核心能力一览",
        items: [
          {
            title: "1️⃣ 标准工时智能测定",
            content: [
              "支持 手工作业 / 人机联合作业 / 自动化设备 / 产线整体作业",
              "自动引导数据收集、异常值识别与标准工时计算",
              "在数据不完整时进行专业估计并声明假设，避免反复追问"
            ]
          },
          {
            title: "2️⃣ 作业动作与价值分析",
            content: [
              "引导工程师将工序分解为最小动作单元",
              "自动区分 价值时间 vs. 辅助时间",
              "量化浪费比例，精准判断改善潜力"
            ]
          },
          {
            title: "3️⃣ 人机协作效率分析",
            content: [
              "可视化呈现\"人等机 / 机等人\"",
              "识别关键等待点与节拍冲突",
              "支持一人多机、同步化工装等改善路径设计"
            ]
          },
          {
            title: "4️⃣ OEE 与设备效率诊断",
            content: [
              "结构化引导设备数据采集",
              "自动计算并对标行业水平",
              "快速定位最大损失源，而不是只给一个 OEE 数字"
            ]
          },
          {
            title: "5️⃣ 产线平衡与瓶颈分析",
            content: [
              "自动识别瓶颈工序",
              "计算产线平衡率（LOB）",
              "深入到瓶颈工序动作层级，形成可落地改善建议"
            ]
          }
        ]
      }
    ]
  } : {
    title: "Project Introduction | PM Series Agent - Time Standard Design Agent",
    sections: [
      {
        title: "Project Introduction",
        content: "The Time Standard Design Agent is an industrial engineering intelligent analysis system for manufacturing engineers and lean teams. It focuses on standard time, integrating time measurement, motion analysis, human-machine collaboration, OEE calculation, and production line balancing through interactive dialogue + automatic analysis to help enterprises quickly and reliably complete process analysis and quota design.",
        content2: "Unlike traditional methods relying on Excel, experience, or expert on-site support, Qingfeng systematizes, processes, and intelligently transforms professional industrial engineering logic, making standard time and efficiency analysis reusable, traceable, and evaluable."
      }
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* 模态框 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-[10%] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden max-w-4xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">{content.title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={language === 'zh' ? '关闭' : 'Close'}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* 内容区域 - 可滚动 */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 md:py-8">
              <div className="space-y-8 max-w-3xl mx-auto">
                {content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-900">{section.title}</h3>
                    
                    {section.content && (
                      <p className="text-base text-gray-700 leading-relaxed">
                        {section.content}
                      </p>
                    )}
                    
                    {section.content2 && (
                      <p className="text-base text-gray-700 leading-relaxed">
                        {section.content2}
                      </p>
                    )}

                    {section.list && (
                      <ul className="space-y-2 list-disc list-inside text-base text-gray-700">
                        {section.list.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    )}

                    {section.footer && (
                      <p className="text-base text-gray-700 leading-relaxed font-medium mt-4">
                        {section.footer}
                      </p>
                    )}

                    {section.items && (
                      <div className="space-y-6 mt-6">
                        {section.items.map((item, i) => (
                          <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">
                              {item.title}
                            </h4>
                            <ul className="space-y-2">
                              {item.content.map((point, j) => (
                                <li key={j} className="text-base text-gray-700 leading-relaxed flex items-start">
                                  <span className="text-gray-400 mr-2">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                {language === 'zh' ? '关闭' : 'Close'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

ProjectModal.displayName = "ProjectModal";
