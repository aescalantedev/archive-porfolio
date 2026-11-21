---
title: "Morph: Procesamiento Multimedia Local con Flutter, BLoC y FFmpeg sin Nube"
description: "Cómo diseñar un conversor de escritorio multiplataforma para video, audio e imágenes ejecutando pipelines de FFmpeg en segundo plano sin congelar el hilo principal de Flutter."
pubDate: 2026-10-28
tags: ["Flutter", "Dart", "FFmpeg", "BLoC", "Desktop", "Arquitectura"]
image: "/images/morph/miniatura.webp"
draft: false
lang: es
---

## 01. El Riesgo de Subir Archivos Privados a Conversores Web

Convertir un video corporativo, un audio confidencial o lotes de imágenes en convertidores web gratuitos implica subir megabytes de información privada a servidores de terceros con límites de tamaño y marcas de agua.

**Morph** resuelve este problema trasladando todo el motor de transcodificación al hardware local del usuario mediante una aplicación de escritorio multiplataforma construida con **Flutter**, **Dart** y **FFmpeg**.

<img src="/images/morph/miniatura.webp" alt="Interfaz de Morph - Conversor Multimedia Local Multiplataforma" loading="lazy" decoding="async" />

---

## 02. Arquitectura Limpia con BLoC y GetIt

El mayor desafío técnico al construir herramientas multimedia de escritorio es evitar que la interfaz gráfica pierda sus 60 FPS mientras la CPU codifica un archivo de video pesado.

### A. Desacoplamiento del Motor de Conversión
1. **Inyección de Dependencias (`get_it`)**: Los servicios de FFmpeg, compresión de imágenes, empaquetado de archivos (`archive`) y generación de PDF se registran como singletons perezosos independientes de la UI.
2. **Máquina de Estados Reactiva (`flutter_bloc`)**: Cada cola de archivos arrastrados a la ventana (`desktop_drop`) emite eventos de progreso asíncronos (`ConversionQueued`, `ConversionProgress`, `ConversionCompleted`), permitiendo procesar lotes completos mostrando el porcentaje exacto en tiempo real.
3. **Integración Nativa de Escritorio**: Mediante `window_manager` y `local_notifier`, Morph se comporta como un ciudadano nativo de primera clase en Windows y macOS, notificando al usuario en cuanto finaliza una cola de exportación pesada.
