// استيراد المكتبات اللازمة من سيرفرات جوجل مباشرة
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// إعدادات مشروعك Lumina
const firebaseConfig = {
  apiKey: "AIzaSyD8h9lpeAexv9JxIoP65ZZw-Qd0Z48q6ak",
  authDomain: "dark-54a72.firebaseapp.com",
  databaseURL: "https://dark-54a72-default-rtdb.firebaseio.com",
  projectId: "dark-54a72",
  storageBucket: "dark-54a72.firebasestorage.app",
  messagingSenderId: "775459781067",
  appId: "1:775459781067:web:68326c7937cc77ac6bde4e"
};

// تشغيل الفايربيس
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// دالة التحكم (الريموت) - يمكنك استدعاؤها من أي مكان
window.sendRemoteCommand = (command) => {
    const statusRef = ref(db, 'remote_status');
    set(statusRef, {
        action: command,
        time: new Date().toLocaleTimeString()
    }).then(() => console.log("تم إرسال الأمر: " + command));
};

// الاستماع للأوامر (لجعل الصفحة تستجيب للريموت)
onValue(ref(db, 'remote_status'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        console.log("وصل أمر من الريموت:", data.action);
        // مثال: لو الأمر 'bg-red' غير لون الصفحة
        if(data.action === 'RED') document.body.style.backgroundColor = 'red';
        if(data.action === 'WHITE') document.body.style.backgroundColor = '#f8fafc';
    }
});