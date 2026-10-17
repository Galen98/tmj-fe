import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import AnalyticsTracker from "../components/AnalyticsTracker";
// import PhoneNavigation from "../components/PhoneNavigation";
import { useState } from "react";
import NotificationDrawer from "../components/mobile/notification/NotificationDrawer";
import ChatListDrawer from "../components/mobile/chatlist/ChatlistDrawer";
import ChatRoomConversationDrawer from "../components/mobile/chatlist/ChatRoomConversationDrawer";

export default function MainLayout() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [chatlistOpen, setChatlistOpen] = useState(false);
  const [chatRoomOpen, setChatRoomOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <div className="app">
      <AnalyticsTracker />
      <ScrollToTop/>
      <Navbar />
        <Outlet />
      <Footer />
      {/* <PhoneNavigation
        onOpenNotification={() => setNotificationOpen(true)}
        onOpenChatlist={() => setChatlistOpen(true)}
      /> */}
      <NotificationDrawer
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
      <ChatListDrawer
      open={chatlistOpen}
      onClose={() => setChatlistOpen(false)}
      onOpenConversation={(id) => {
        setSelectedChatId(id);
        setChatlistOpen(false);
        setChatRoomOpen(true);
      }}
    />
    <ChatRoomConversationDrawer
      open={chatRoomOpen}
      onClose={() => setChatRoomOpen(false)}
      chatId={selectedChatId}
    />
    </div>
  );
}