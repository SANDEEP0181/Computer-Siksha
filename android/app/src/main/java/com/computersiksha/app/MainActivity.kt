package com.computersiksha.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

private data class CourseModule(val id: String, val titleEn: String, val titleHi: String, val descEn: String, val descHi: String)

private val modules = listOf(
    CourseModule("M01","Introduction to Computers","कंप्यूटर का परिचय","Understand computers, their history, types and uses.","कंप्यूटर, उसका इतिहास, प्रकार और उपयोग समझें।"),
    CourseModule("M02","Computer Hardware","कंप्यूटर हार्डवेयर","Learn the physical parts of a computer.","कंप्यूटर के भौतिक भागों को पहचानें।"),
    CourseModule("M03","Input, Output and Storage Devices","इनपुट, आउटपुट और स्टोरेज डिवाइस","Learn how devices exchange information.","डिवाइस जानकारी का आदान-प्रदान कैसे करते हैं।"),
    CourseModule("M04","Operating System and Windows Basics","ऑपरेटिंग सिस्टम और Windows","Use the desktop and manage files and folders.","डेस्कटॉप चलाएँ और फाइल-फोल्डर व्यवस्थित करें।"),
    CourseModule("M05","Office Productivity","ऑफिस प्रोडक्टिविटी","Build document, spreadsheet and presentation skills.","डॉक्यूमेंट, स्प्रेडशीट और प्रेजेंटेशन सीखें।"),
    CourseModule("M06","Internet and Networking","इंटरनेट और नेटवर्किंग","Understand browsers, email, Wi-Fi and networks.","ब्राउज़र, ईमेल, Wi-Fi और नेटवर्क समझें।"),
    CourseModule("M07","Software and Coding Basics","सॉफ्टवेयर और कोडिंग","Learn software types and the first ideas in coding.","सॉफ्टवेयर के प्रकार और कोडिंग की शुरुआत करें।"),
    CourseModule("M08","Cyber Security and Online Safety","साइबर सुरक्षा और ऑनलाइन सेफ्टी","Protect devices, accounts and personal information.","डिवाइस, अकाउंट और निजी जानकारी सुरक्षित रखें।"),
    CourseModule("M09","Keyboard Shortcuts and Typing","कीबोर्ड शॉर्टकट और टाइपिंग","Improve computer skills with keyboard practice.","कीबोर्ड अभ्यास से कंप्यूटर स्किल बढ़ाएँ।"),
    CourseModule("M10","Computer Data and Storage Units","कंप्यूटर डेटा और स्टोरेज यूनिट","Understand bits, bytes, files and storage.","Bit, Byte, फाइल और स्टोरेज समझें।"),
    CourseModule("M11","Basic Troubleshooting","कंप्यूटर की सामान्य समस्याएँ","Identify and resolve common computer problems safely.","कंप्यूटर की सामान्य समस्याएँ सुरक्षित तरीके से पहचानें।"),
    CourseModule("M12","Modern Technology","आधुनिक तकनीक","Explore AI, cloud, blockchain, IoT and digital payments.","AI, Cloud, Blockchain, IoT और डिजिटल पेमेंट जानें।")
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { ComputerSikshaApp() }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ComputerSikshaApp() {
    var hindi by remember { mutableStateOf(false) }
    var selected by remember { mutableStateOf<String?>(null) }
    MaterialTheme(colorScheme = lightColorScheme(primary = androidx.compose.ui.graphics.Color(0xFF176B3A))) {
        Scaffold(topBar = {
            TopAppBar(title = { Text("Computer Siksha") }, actions = {
                TextButton(onClick = { hindi = !hindi }) { Text(if (hindi) "English" else "हिन्दी") }
            })
        }) { padding ->
            LazyColumn(modifier = Modifier.fillMaxSize().padding(padding).padding(horizontal = 16.dp)) {
                item {
                    Text(if (hindi) "हर किसी के लिए कंप्यूटर की शिक्षा।" else "Computer knowledge for everyone.",
                        style = MaterialTheme.typography.headlineSmall, modifier = Modifier.padding(top = 18.dp, bottom = 8.dp))
                    Text(if (hindi) "मुफ्त शिक्षा · 12 लर्निंग मॉड्यूल" else "Free learning · 12 learning modules",
                        color = MaterialTheme.colorScheme.primary, modifier = Modifier.padding(bottom = 18.dp))
                }
                items(modules) { module ->
                    Card(onClick = { selected = if (selected == module.id) null else module.id },
                        modifier = Modifier.fillMaxWidth().padding(bottom = 10.dp)) {
                        Column(Modifier.padding(16.dp)) {
                            Text(module.id, color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.labelMedium)
                            Text(if (hindi) module.titleHi else module.titleEn, style = MaterialTheme.typography.titleMedium)
                            Text(if (hindi) module.descHi else module.descEn, style = MaterialTheme.typography.bodySmall)
                            if (selected == module.id) {
                                Spacer(Modifier.height(8.dp))
                                Text(if (hindi) "इस मॉड्यूल के विस्तृत पाठ अगले संस्करण में जोड़े जाएंगे।" else "Detailed lessons for this module will be added in the next release.")
                            }
                        }
                    }
                }
            }
        }
    }
}
