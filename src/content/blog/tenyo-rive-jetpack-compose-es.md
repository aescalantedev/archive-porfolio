---
title: "Ingeniería de Tenyo: Mapa Corporal en Rive 2D y Jetpack Compose 100% Offline"
description: "Diseño e implementación de una aplicación Android nativa de biomecánica y entrenamiento con más de 1,300 ejercicios indexados en Room SQLite y máquinas de estado vectoriales en Rive."
pubDate: 2026-11-10
tags: ["Kotlin", "Jetpack Compose", "Rive 2D", "Room SQLite", "Android", "Offline-First"]
image: "/images/tenyo/feature-graphic.webp"
draft: false
lang: es
---

## 01. Privacidad y Velocidad en el Gimnasio: Por Qué 100% Offline

La mayoría de las aplicaciones modernas de entrenamiento sufren de dos problemas de diseño: exigen conexión permanente a internet (en gimnasios donde la cobertura móvil suele ser nula) y bloquean al usuario con muros de registro y telemetría invasiva antes de mostrar el primer ejercicio.

**Tenyo (天与)** —disponible en [tenyo.aescalante.dev](https://tenyo.aescalante.dev/)— fue concebida bajo una arquitectura estrictamente **Offline-First**: cero servidores intermedios, cero anuncios y más de 1,300 ejercicios con desglose biomecánico (músculos agonistas, sinergistas y pasos técnicos) almacenados localmente en el dispositivo.

<img src="/images/tenyo/feature-graphic.webp" alt="Tenyo App - Entrenamiento y Biomecánica Offline en Android" loading="lazy" decoding="async" />

---

## 02. Integración de Máquinas de Estado Rive 2D con Jetpack Compose

En lugar de obligar al usuario a buscar ejercicios en listas interminables de texto, Tenyo incorpora un **Mapa Corporal Interactivo 2D** con rotación Frente/Espalda.

### A. Comunicación Bidireccional Rive ↔ ViewModel
Utilizando el runtime nativo de **Rive** para Android dentro de un contenedor de **Jetpack Compose**:
1. Cada grupo muscular (pectoral, dorsal, deltoides, cuádriceps, isquiotibiales, core) está vinculado a un *State Machine Input* y un *Hitbox* vectorial dentro del archivo `.riv`.
2. Cuando el usuario toca una zona anatómica en pantalla, el listener de Rive emite el identificador muscular hacia el `ViewModel` en Kotlin mediante `StateFlow`.
3. La interfaz de Compose reacciona instantáneamente filtrando los protocolos y ejercicios específicos para ese grupo muscular sin tiempos de carga.

---

## 03. Indexación de +1,300 Ejercicios en Room SQLite

Para lograr búsquedas instantáneas combinando equipamiento (barra olímpica, mancuernas, poleas, máquinas o calistenia en casa) y grupo muscular:
* Pre-empaquetamos y normalizamos el catálogo anatómico en **Room Database** utilizando KSP y Kotlin Serialization.
* Implementamos consultas reactivas con `Flow` y paginación en memoria, logrando que el filtrado y el cálculo de volumen semanal en kilogramos e IMC se ejecuten en menos de 5 milisegundos.
