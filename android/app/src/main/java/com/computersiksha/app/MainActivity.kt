package com.computersiksha.app

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView

class MainActivity : ComponentActivity() {
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                var webView by remember { mutableStateOf<WebView?>(null) }
                BackHandler(enabled = webView?.canGoBack() == true) {
                    webView?.goBack()
                }
                Surface(modifier = Modifier.fillMaxSize()) {
                    AndroidView(
                        modifier = Modifier.fillMaxSize(),
                        factory = { context ->
                            WebView(context).apply {
                                settings.javaScriptEnabled = true
                                settings.domStorageEnabled = true
                                settings.allowFileAccess = true
                                settings.allowContentAccess = false
                                settings.setSupportZoom(true)
                                webViewClient = WebViewClient()
                                webChromeClient = WebChromeClient()
                                setBackgroundColor(android.graphics.Color.rgb(245, 250, 246))
                                loadUrl("file:///android_asset/index.html")
                                webView = this
                            }
                        },
                        update = { webView = it }
                    )
                }
            }
        }
    }
}