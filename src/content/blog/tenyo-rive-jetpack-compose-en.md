---
title: "Engineering Tenyo: Interactive Rive 2D Body Map and 100% Offline Jetpack Compose"
description: "Designing and building a native Android biomechanics and workout app with 1,300+ exercises indexed in Room SQLite and interactive vector state machines in Rive."
pubDate: 2026-11-10
tags: ["Kotlin", "Jetpack Compose", "Rive 2D", "Room SQLite", "Android", "Offline-First"]
image: "/images/tenyo/feature-graphic.webp"
draft: false
lang: en
---

## 01. Privacy and Speed on the Gym Floor: Why 100% Offline

Most modern fitness apps suffer from two architectural flaws: they require a constant internet connection (inside gyms where cellular signal is often dead) and force users through sign-up walls and invasive telemetry before showing a single workout.

**Tenyo (天与)**—available at [tenyo.aescalante.dev](https://tenyo.aescalante.dev/)—was built on a strict **Offline-First** philosophy: zero cloud dependencies, zero ads, and over 1,300 exercises with full biomechanical breakdowns (agonist/synergist muscles and execution steps) stored locally on the device.

<img src="/images/tenyo/feature-graphic.webp" alt="Tenyo App - Offline Biomechanics and Workout Companion on Android" loading="lazy" decoding="async" />

---

## 02. Bridging Rive 2D State Machines with Jetpack Compose

Instead of forcing users to scroll through long text dropdowns, Tenyo features an **Interactive 2D Anatomical Body Map** with Front/Back rotation.

### A. Bidirectional Rive ↔ ViewModel Sync
By embedding the native Android **Rive** runtime inside **Jetpack Compose**:
1. Each muscle group (chest, lats, deltoids, quads, hamstrings, core) is bound to vector hitboxes and state machine inputs inside the `.riv` asset.
2. Tapping a muscle zone dispatches the anatomical ID directly to the Kotlin `ViewModel` via `StateFlow`.
3. Compose immediately filters the exercise catalog and training protocols with zero network latency.

---

## 03. Indexing 1,300+ Biomechanical Exercises in Room SQLite

To support instant multi-criteria filtering across equipment types (barbell, dumbbell, cables, gym machines, or bodyweight calisthenics) and target muscles:
* The entire anatomical dataset is normalized in **Room Database** using KSP and Kotlin Serialization.
* Reactive `Flow` queries compute weekly training volume (kg), rest timer states, and BMI metrics in under 5 milliseconds.
