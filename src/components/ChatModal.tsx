"use client";

import { memo, useEffect, useState } from "react";
import { X, RefreshCw, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal = memo(({ isOpen, onClose }: ChatModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
      setHasError(false);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 超时检测 - 如果30秒后还在加载，显示错误
  useEffect(() => {
    if (!isOpen) return;

    let timeoutId: NodeJS.Timeout;
    
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
        setHasError(true);
      }, 30000); // 30秒超时
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOpen, isLoading]);

  // ESC 键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // iframe加载完成处理
  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // iframe错误处理
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // 重新加载iframe
  const handleReload = () => {
    setIframeKey(prev => prev + 1);
    setIsLoading(true);
    setHasError(false);
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* 模态框 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* 头部 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary to-secondary">
              <h2 className="text-xl font-semibold text-white">工厂AI数字员工</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="关闭"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* iframe 容器 */}
            <div className="flex-1 relative bg-gray-50">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="text-center">
                    <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-600">正在加载聊天窗口...</p>
                  </div>
                </div>
              )}
              
              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="text-center px-6 py-8 max-w-md">
                    <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <p className="text-base font-semibold text-gray-800 mb-2">无法加载聊天窗口</p>
                    <p className="text-sm text-gray-600 mb-2">可能的原因：</p>
                    <ul className="text-xs text-gray-500 text-left mb-6 space-y-1 max-w-xs mx-auto">
                      <li>• 网络连接问题</li>
                      <li>• 分享链接已过期或失效</li>
                      <li>• 服务器暂时不可用</li>
                    </ul>
                    <button
                      onClick={handleReload}
                      className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto shadow-md"
                    >
                      <RefreshCw className="w-4 h-4" />
                      重新加载
                    </button>
                  </div>
                </div>
              )}

              <iframe 
                key={iframeKey}
                src="https://cloud.fastgpt.cn/chat/share?shareId=vFX7r3XJIUD215GORKgPMPpB" 
                className="absolute inset-0 w-full h-full border-0"
                allow="clipboard-write; microphone; camera"
                allowFullScreen
                frameBorder="0"
                title="工时测评助手"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{ 
                  opacity: isLoading || hasError ? 0 : 1,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

ChatModal.displayName = "ChatModal";
