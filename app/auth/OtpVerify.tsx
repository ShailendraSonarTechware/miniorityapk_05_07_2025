import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { verifyOtp } from "../../services/verigyOtpApi";
import { resendOtp } from "../../services/resendOtpApi";

export default function OtpVerify() {
    const { email } = useLocalSearchParams<{ email: string }>();

    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [resending, setResending] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(0); // countdown in seconds
    const inputRef = useRef<TextInput>(null);

    // ⏳ Run countdown
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    const handleChange = (text: string) => {
        const clean = text.replace(/[^0-9]/g, "").slice(0, 6);
        setOtp(clean);
    };

    const handleVerify = async () => {
        if (!otp || otp.length < 6) {
            Alert.alert("Invalid OTP", "Please enter the 6-digit OTP.");
            return;
        }

        setLoading(true);
        try {
            const res = await verifyOtp({ email, otp });
            if (res.success) {
                Alert.alert("Success", "OTP verified successfully!");
                router.replace("/auth/Login"); // 👈 Direct navigation
            } else {
                Alert.alert("Error", res.message || "Invalid OTP");
            }
        } catch (err: any) {
            Alert.alert(
                "Error",
                err?.response?.data?.message || err.message || "Server error"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (timer > 0) return; // prevent spam

        setResending(true);
        try {
            const res = await resendOtp(email);
            if (res.success) {
                Alert.alert("OTP Sent", "A new OTP has been sent to your email.");
                setTimer(30); // start 30s countdown
            } else {
                Alert.alert("Error", res.message || "Failed to resend OTP");
            }
        } catch (err: any) {
            Alert.alert(
                "Error",
                err?.response?.data?.message || err.message || "Server error"
            );
        } finally {
            setResending(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
                Enter the 6-digit OTP sent to <Text style={styles.bold}>{email}</Text>
            </Text>

            {/* 🔒 Hidden input */}
            <TextInput
                ref={inputRef}
                style={styles.hiddenInput}
                value={otp}
                onChangeText={handleChange}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
            />

            {/* 🔢 OTP Boxes */}
            <TouchableOpacity
                style={styles.boxContainer}
                onPress={() => inputRef.current?.focus()}
                activeOpacity={1}
            >
                {Array.from({ length: 6 }).map((_, i) => (
                    <View
                        key={i}
                        style={[styles.box, otp[i] && styles.boxFilled]}
                    >
                        <Text style={styles.boxText}>{otp[i] || ""}</Text>
                    </View>
                ))}
            </TouchableOpacity>

            {/* ✅ Verify button */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleVerify}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Verify</Text>
                )}
            </TouchableOpacity>

            {/* 🔁 Resend OTP line with timer */}
            <View style={styles.resendContainer}>
                <Text style={styles.normalText}>Didn’t receive the code? </Text>
                {timer > 0 ? (
                    <Text style={styles.disabledText}>Resend in {timer}s</Text>
                ) : (
                    <TouchableOpacity onPress={handleResend} disabled={resending}>
                        <Text style={styles.linkText}>
                            {resending ? "Resending..." : "Resend OTP"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f9f9f9" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    subtitle: { fontSize: 14, color: "#555", marginBottom: 20, textAlign: "center" },
    bold: { fontWeight: "600" },

    hiddenInput: { position: "absolute", opacity: 0, height: 0, width: 0 },
    boxContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
    box: {
        width: 45,
        height: 55,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        backgroundColor: "#fff",
    },
    boxFilled: { borderColor: "#00A9CB" },
    boxText: { fontSize: 20, fontWeight: "600", color: "#000" },

    button: { backgroundColor: "#00A9CB", paddingVertical: 14, borderRadius: 10, width: "80%", alignItems: "center", marginBottom: 15 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

    resendContainer: { flexDirection: "row", marginTop: 10 },
    normalText: { color: "#000", fontSize: 14 },
    linkText: { color: "#00A9CB", fontWeight: "600", fontSize: 14 },
    disabledText: { color: "#888", fontSize: 14 },
});
