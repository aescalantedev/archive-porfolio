---
title: "Arquitectura de Raven: Integrando ADB y scrcpy-server con Rust y Tauri v2"
description: "Cómo construí una estación de trabajo de escritorio para control e inspección de dispositivos Android combinando procesos asíncronos en Rust (Tokio), sockets TCP de scrcpy y emparejamiento inalámbrico mDNS por código QR."
pubDate: 2026-11-18
tags: ["Rust", "Tauri v2", "Android", "scrcpy", "React 19", "Arquitectura"]
image: "/images/raven/dashboard.webp"
draft: false
lang: es
---

## 01. El Problema del Desarrollo y Diagnóstico en Android

Cuando trabajas a diario desarrollando aplicaciones nativas para Android o dando soporte a terminales Handheld industriales, dependes de una cadena fragmentada de herramientas de línea de comandos: `adb` para instalar paquetes y leer logs, `scrcpy` en otra ventana para reflejar la pantalla, y comandos manuales para emparejar dispositivos por Wi-Fi.

**Raven** nació con un objetivo de ingeniería concreto: unificar el control de pantalla de ultra baja latencia, la telemetría de hardware en vivo, el administrador de paquetes APK y el emparejamiento inalámbrico en una sola estación de trabajo ligera, sin el consumo excesivo de memoria RAM de Electron.

<img src="/images/raven/dashboard.webp" alt="Raven Dashboard Principal y Telemetría Android" loading="lazy" decoding="async" />

> "Una herramienta de sistemas para desarrolladores no debe consumir más recursos que el propio IDE."

---

## 02. Por Qué Tauri v2 + Rust (Tokio) en Lugar de Electron

El núcleo de Raven necesita gestionar procesos binarios del sistema operativo (`adb.exe` y `scrcpy-server`), abrir sockets TCP locales y procesar flujos binarios de video y eventos táctiles en tiempo real.

### A. Orquestación Asíncrona con Tokio
En el backend (`src-tauri`), cada subsistema está aislado en módulos de Rust:
* **`process/`**: Resuelve de forma autónoma los binarios embebidos (`platform-tools/adb` y `scrcpy-server v5.0.1`), evitando que el usuario tenga que configurar variables `PATH` en su sistema operativo.
* **`scrcpy/`**: Levanta el servidor en el dispositivo Android mediante `adb push` y `adb forward`, estableciendo canales TCP asíncronos con `tokio::net::TcpStream` para multiplexar el stream de video y la inyección de eventos de teclado/ratón con latencia sub-30ms.
* **Reconexión Inteligente y Modo PiP**: Al cambiar de pestaña dentro de la interfaz de React 19, el backend pausa o reanuda la sesión de forma limpia para liberar ciclos de CPU y GPU.

<img src="/images/raven/screen-control.webp" alt="Control de Pantalla en Tiempo Real con scrcpy integrado en Raven" loading="lazy" decoding="async" />

---

## 03. Vinculación Inalámbrica sin Fricción: QR + mDNS (ZeroConf)

A partir de Android 11, Google introdujo la depuración inalámbrica mediante TLS. Sin embargo, desde consola requiere generar credenciales, leer puertos efímeros e ingresar códigos manualmente.

En Raven automatizamos este flujo en tres pasos:
1. Generamos en pantalla un **código QR** con el formato estándar de aprovisionamiento `WIFI:T:ADB;S:<service>;P:<password>;;`.
2. Activamos el descubrimiento **mDNS (ZeroConf)** escuchando el servicio `_adb-tls-connect._tcp` en la red local.
3. En cuanto el teléfono escanea el QR desde *Opciones de Desarrollador*, el backend en Rust detecta el anuncio mDNS, negocia el handshake TLS y conecta el dispositivo automáticamente sin que el desarrollador escriba una sola dirección IP.

---

## 04. Administrador de Paquetes APK y Seguridad en Terminal ADB

Para evitar ejecuciones accidentales o inyecciones de comandos al exponer una consola ADB en el frontend (`React 19 + TypeScript + Tailwind v4`), todos los comandos pasan por un validador estricto en Rust (`src-tauri/src/terminal/`) antes de invocarse sobre el subproceso.

<img src="/images/raven/applications.webp" alt="Administrador de Aplicaciones y Paquetes APK en Raven" loading="lazy" decoding="async" />

El resultado es un ejecutable nativo de pocos megabytes que ofrece telemetría de batería, temperatura, uso de RAM, explorador de archivos y control de pantalla en tiempo real.
