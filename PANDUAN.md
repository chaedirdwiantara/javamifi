# Panduan JavaMiFi App

Project React Native CLI - Versi 0.82.1 (Stable)

## Informasi Project
- **Nama Project**: JavaMiFiApp
- **React Native Version**: 0.82.1
- **React Version**: 19.1.1
- **Target Platform**: Android (Primary), iOS (Optional)

## Prasyarat

Pastikan Anda sudah menginstall:
1. **Node.js** (>= 20) - [Download disini](https://nodejs.org/)
2. **Java Development Kit (JDK)** - Recommended JDK 17
3. **Android Studio** dengan:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
4. **Emulator Android** atau **Device fisik** dengan USB Debugging enabled

## Struktur Project

```
JAVAMIFI/
├── android/           # Kode native Android
├── ios/              # Kode native iOS
├── __tests__/        # File testing
├── App.tsx           # Komponen utama aplikasi
├── index.js          # Entry point aplikasi
├── package.json      # Dependencies dan scripts
└── node_modules/     # Dependencies yang terinstall
```

## Cara Menjalankan Project

### Langkah 1: Pastikan Dependencies Sudah Terinstall

Dependencies sudah terinstall saat setup. Jika perlu install ulang:

```bash
npm install
```

### Langkah 2: Start Metro Bundler

Metro adalah JavaScript bundler untuk React Native. Jalankan di terminal pertama:

```bash
npm start
```

atau

```bash
npx react-native start
```

### Langkah 3: Jalankan di Android

**Pastikan salah satu dari ini sudah siap:**
- Emulator Android sudah running, ATAU
- Device Android terhubung via USB dengan USB Debugging enabled

Buka terminal BARU (biarkan Metro tetap running), lalu jalankan:

```bash
npm run android
```

atau

```bash
npx react-native run-android
```

**Catatan**: Proses build pertama kali akan memakan waktu beberapa menit karena harus download Gradle dependencies.

## Cara Cek Device/Emulator

Untuk memastikan device atau emulator terdeteksi, jalankan:

```bash
adb devices
```

Output yang diharapkan:
```
List of devices attached
emulator-5554    device
```

Jika tidak ada device yang terhubung, Anda perlu:
1. **Untuk Emulator**: Buka Android Studio > Device Manager > Start Emulator
2. **Untuk Device Fisik**: 
   - Enable Developer Options
   - Enable USB Debugging
   - Hubungkan via USB dan pilih "File Transfer" mode

## Tips Development

### Hot Reload
Aplikasi akan otomatis reload saat Anda save perubahan kode (Fast Refresh).

### Manual Reload
- Tekan **R** dua kali pada keyboard
- Atau buka Dev Menu: Shake device atau tekan **Ctrl + M** (Windows)

### Debug Menu
- **Windows/Linux**: Ctrl + M
- Pilih "Debug" untuk membuka Chrome DevTools

### Clear Cache
Jika mengalami masalah, coba clear cache:

```bash
npm start -- --reset-cache
```

atau

```bash
cd android
./gradlew clean
cd ..
npm start
```

## Troubleshooting

### Error: "SDK location not found"
Buat file `local.properties` di folder `android/`:
```
sdk.dir=C:\\Users\\[YOUR_USERNAME]\\AppData\\Local\\Android\\Sdk
```

### Error: "JAVA_HOME not set"
Set environment variable JAVA_HOME ke lokasi JDK Anda.

### Error: "Unable to load script"
1. Pastikan Metro bundler sudah running
2. Clear cache dengan: `npm start -- --reset-cache`

### Build gagal
1. Clean build folder:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```
2. Hapus node_modules dan install ulang:
   ```bash
   rm -rf node_modules
   npm install
   ```

## Siap untuk Instruksi Selanjutnya!

Project React Native CLI sudah berhasil dibuat dan siap untuk dikembangkan. 

**Status Saat Ini:**
- ✅ Project dibuat dengan React Native 0.82.1 (Stable)
- ✅ Dependencies terinstall
- ✅ Struktur Android sudah siap
- ✅ Siap untuk di-run di Android

Silakan lanjutkan dengan instruksi development Anda!
