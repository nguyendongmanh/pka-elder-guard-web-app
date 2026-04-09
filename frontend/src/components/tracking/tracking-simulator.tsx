"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { MapPin, Play, Square, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DEVICE_ID = "mobile-18";
const EXTERNAL_API_URL = "http://54.206.94.56:8000/api/v1/location";

const DEFAULT_ANCHOR_LAT = 10.762622;
const DEFAULT_ANCHOR_LNG = 106.660172;
const DEFAULT_RADIUS = 100;
const SIMULATION_STEP = 0.0001;

interface LocationLog {
  id: number;
  latitude: number;
  longitude: number;
  status: "success" | "error";
  response?: Record<string, unknown>;
  error?: string;
  timestamp: Date;
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function TrackingSimulator() {
  const [anchorLat, setAnchorLat] = useState(String(DEFAULT_ANCHOR_LAT));
  const [anchorLng, setAnchorLng] = useState(String(DEFAULT_ANCHOR_LNG));
  const [radius, setRadius] = useState(String(DEFAULT_RADIUS));
  const [deviceLat, setDeviceLat] = useState(String(DEFAULT_ANCHOR_LAT));
  const [deviceLng, setDeviceLng] = useState(String(DEFAULT_ANCHOR_LNG + 0.001));
  const [isSending, setIsSending] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [direction, setDirection] = useState(1);
  const [lastResponse, setLastResponse] = useState<Record<string, unknown> | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [logs, setLogs] = useState<LocationLog[]>([]);
  const logIdRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const anchorLatNum = parseFloat(anchorLat) || DEFAULT_ANCHOR_LAT;
  const anchorLngNum = parseFloat(anchorLng) || DEFAULT_ANCHOR_LNG;
  const radiusNum = parseFloat(radius) || DEFAULT_RADIUS;
  const deviceLatNum = parseFloat(deviceLat) || 0;
  const deviceLngNum = parseFloat(deviceLng) || 0;
  const distance = haversineDistance(anchorLatNum, anchorLngNum, deviceLatNum, deviceLngNum);
  const isSafe = distance <= radiusNum;

  const sendToExternalApi = useCallback(
    async (lat: number, lng: number) => {
      setIsSending(true);
      setLastError(null);
      try {
        const res = await fetch(EXTERNAL_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            device_id: DEVICE_ID,
            latitude: lat,
            longitude: lng,
          }),
        });

        const data = await res.json();
        setLastResponse(data);
        logIdRef.current += 1;
        setLogs((prev) => [
          { id: logIdRef.current, latitude: lat, longitude: lng, status: "success", response: data, timestamp: new Date() },
          ...prev.slice(0, 49),
        ]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Lỗi không xác định";
        setLastError(msg);
        logIdRef.current += 1;
        setLogs((prev) => [
          { id: logIdRef.current, latitude: lat, longitude: lng, status: "error", error: msg, timestamp: new Date() },
          ...prev.slice(0, 49),
        ]);
      } finally {
        setIsSending(false);
      }
    },
    []
  );

  const handleSendLocation = useCallback(() => {
    sendToExternalApi(parseFloat(deviceLat), parseFloat(deviceLng));
  }, [sendToExternalApi, deviceLat, deviceLng]);

  const simulationTick = useCallback(() => {
    setDeviceLng((prev) => {
      const val = parseFloat(prev) + SIMULATION_STEP * direction;
      return String(val.toFixed(6));
    });
  }, [direction]);

  useEffect(() => {
    if (isSimulating) {
      intervalRef.current = setInterval(() => {
        simulationTick();
      }, 2000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating, simulationTick]);

  useEffect(() => {
    if (!isSimulating) return;
    sendToExternalApi(parseFloat(deviceLat), parseFloat(deviceLng));
  }, [isSimulating, deviceLng, sendToExternalApi, deviceLat]);

  const handleToggleSimulation = () => {
    setIsSimulating((prev) => !prev);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setDeviceLat(String(DEFAULT_ANCHOR_LAT));
    setDeviceLng(String(DEFAULT_ANCHOR_LNG + 0.001));
    setLastResponse(null);
    setLastError(null);
    setLogs([]);
    setDirection(1);
  };

  const unsafeLogs = logs.filter((l) => {
    const d = haversineDistance(anchorLatNum, anchorLngNum, l.latitude, l.longitude);
    return d > radiusNum;
  });

  return (
    <div className="flex flex-col gap-5 h-full min-h-0">
      <h1 className="text-xl font-bold text-[#0F172A] shrink-0">
        Theo dõi vị trí thiết bị đeo tay
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 flex-1 min-h-0 overflow-auto">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={16} className="text-[#0D9488]" />
                Cấu hình vùng an toàn
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-medium text-[#64748B]">Mã thiết bị</label>
                <Input value={DEVICE_ID} disabled className="bg-gray-50 text-[#64748B]" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-[#64748B]">Vị trí mốc (Vĩ độ)</label>
                  <Input value={anchorLat} onChange={(e) => setAnchorLat(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#64748B]">Vị trí mốc (Kinh độ)</label>
                  <Input value={anchorLng} onChange={(e) => setAnchorLng(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[#64748B]">Bán kính an toàn (mét)</label>
                <Input value={radius} onChange={(e) => setRadius(e.target.value)} />
              </div>
              <div className="bg-[#F8FAFC] rounded-lg p-3 text-xs text-[#64748B]">
                <p>Endpoint: <code className="text-[#0D9488] font-mono">{EXTERNAL_API_URL}</code></p>
                <p className="mt-1">Dữ liệu gửi: <code className="font-mono">{`{ device_id, latitude, longitude }`}</code></p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send size={16} className="text-[#0D9488]" />
                Giả lập vị trí thiết bị
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-[#64748B]">Vĩ độ thiết bị</label>
                  <Input value={deviceLat} onChange={(e) => setDeviceLat(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#64748B]">Kinh độ thiết bị</label>
                  <Input value={deviceLng} onChange={(e) => setDeviceLng(e.target.value)} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSendLocation}
                  disabled={isSending}
                  className="flex-1 bg-[#0D9488] hover:bg-teal-700 text-white"
                >
                  <Send size={14} />
                  Gửi vị trí
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleToggleSimulation}
                  variant={isSimulating ? "destructive" : "default"}
                  className="flex-1"
                >
                  {isSimulating ? (
                    <>
                      <Square size={14} /> Dừng giả lập
                    </>
                  ) : (
                    <>
                      <Play size={14} /> Bắt đầu giả lập
                    </>
                  )}
                </Button>
                <Button onClick={() => setDirection((d) => -d)} variant="outline" title="Đổi hướng di chuyển">
                  <RotateCcw size={14} />
                </Button>
                <Button onClick={handleReset} variant="outline" title="Đặt lại">
                  <RotateCcw size={14} />
                </Button>
              </div>
              {isSimulating && (
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Đang giả lập — thiết bị di chuyển {direction > 0 ? "về phía đông" : "về phía tây"}...
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái hiện tại</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-center p-6 rounded-xl">
                <div
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${
                    isSafe
                      ? "bg-green-100 border-4 border-green-400 shadow-lg shadow-green-200"
                      : "bg-red-100 border-4 border-red-500 shadow-lg shadow-red-200 animate-pulse"
                  }`}
                >
                  <MapPin
                    size={32}
                    className={isSafe ? "text-green-600" : "text-red-600"}
                  />
                  <span
                    className={`text-sm font-bold mt-1 ${
                      isSafe ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {isSafe ? "AN TOÀN" : "CẢNH BÁO"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-[#F8FAFC] rounded-lg p-3">
                  <p className="text-[#64748B] text-xs">Khoảng cách</p>
                  <p className="font-bold text-[#0F172A]">{distance.toFixed(1)}m</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-lg p-3">
                  <p className="text-[#64748B] text-xs">Giới hạn</p>
                  <p className="font-bold text-[#0F172A]">{radiusNum}m</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-lg p-3">
                  <p className="text-[#64748B] text-xs">Vị trí thiết bị</p>
                  <p className="font-bold text-[#0F172A] text-xs">
                    {deviceLatNum.toFixed(6)}, {deviceLngNum.toFixed(6)}
                  </p>
                </div>
                <div className="bg-[#F8FAFC] rounded-lg p-3">
                  <p className="text-[#64748B] text-xs">Vị trí mốc</p>
                  <p className="font-bold text-[#0F172A] text-xs">
                    {anchorLatNum.toFixed(6)}, {anchorLngNum.toFixed(6)}
                  </p>
                </div>
              </div>

              {!isSafe && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 text-center font-medium">
                  THIẾT BỊ ĐÃ RA NGOÀI VÙNG AN TOÀN! ({distance.toFixed(1)}m / {radiusNum}m)
                </div>
              )}

              {lastError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 text-center">
                  Lỗi gửi: {lastError}
                </div>
              )}

              {lastResponse && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs font-medium text-green-700 mb-1">Phản hồi từ server:</p>
                  <pre className="text-[10px] text-green-800 overflow-auto max-h-24 whitespace-pre-wrap break-all">
                    {JSON.stringify(lastResponse, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="flex-1 min-h-[300px]">
            <CardHeader>
              <CardTitle>Bản đồ vị trí</CardTitle>
            </CardHeader>
            <CardContent>
              <LocationMap
                anchorLat={anchorLatNum}
                anchorLng={anchorLngNum}
                radius={radiusNum}
                deviceLat={deviceLatNum}
                deviceLng={deviceLngNum}
                isSafe={isSafe}
                logs={logs}
                anchorLatNum={anchorLatNum}
                anchorLngNum={anchorLngNum}
                radiusNum={radiusNum}
              />
            </CardContent>
          </Card>
        </div>

        <Card className="flex flex-col min-h-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lịch sử gửi vị trí</span>
              <div className="flex gap-2">
                {unsafeLogs.length > 0 && (
                  <Badge variant="destructive">{unsafeLogs.length} cảnh báo</Badge>
                )}
                <Badge variant="secondary">{logs.length} bản ghi</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-2">
              {logs.length === 0 ? (
                <p className="text-sm text-[#64748B] text-center py-8">
                  Chưa có lịch sử vị trí
                </p>
              ) : (
                logs.map((log) => {
                  const d = haversineDistance(anchorLatNum, anchorLngNum, log.latitude, log.longitude);
                  const safe = d <= radiusNum;
                  return (
                    <div
                      key={log.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        log.status === "error"
                          ? "bg-yellow-50 border-yellow-200"
                          : safe
                          ? "bg-white border-[#E2E8F0]"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full shrink-0 ${
                          log.status === "error"
                            ? "bg-yellow-500"
                            : safe
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-[#0F172A]">
                            {log.latitude.toFixed(6)}, {log.longitude.toFixed(6)}
                          </span>
                          {log.status === "error" ? (
                            <Badge variant="outline" className="text-[10px] px-1.5">Lỗi</Badge>
                          ) : (
                            <Badge variant={safe ? "default" : "destructive"} className="text-[10px] px-1.5">
                              {safe ? "An toàn" : "Ngoài vùng"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          {d.toFixed(1)}m — {log.timestamp.toLocaleTimeString("vi-VN")}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LocationMap({
  anchorLat,
  anchorLng,
  radius,
  deviceLat,
  deviceLng,
  isSafe,
  logs,
  anchorLatNum,
  anchorLngNum,
  radiusNum,
}: {
  anchorLat: number;
  anchorLng: number;
  radius: number;
  deviceLat: number;
  deviceLng: number;
  isSafe: boolean;
  logs: LocationLog[];
  anchorLatNum: number;
  anchorLngNum: number;
  radiusNum: number;
}) {
  type MapPoint = { lat: number; lng: number; safe: boolean };
  const allPoints: MapPoint[] = [
    { lat: anchorLat, lng: anchorLng, safe: true },
    { lat: deviceLat, lng: deviceLng, safe: isSafe },
    ...logs.slice(0, 10).map((l) => ({ lat: l.latitude, lng: l.longitude, safe: haversineDistance(anchorLatNum, anchorLngNum, l.latitude, l.longitude) <= radiusNum })),
  ].filter((p) => p.lat !== 0 || p.lng !== 0);

  const minLat = Math.min(...allPoints.map((p) => p.lat));
  const maxLat = Math.max(...allPoints.map((p) => p.lat));
  const minLng = Math.min(...allPoints.map((p) => p.lng));
  const maxLng = Math.max(...allPoints.map((p) => p.lng));

  const padding = 0.002;
  const latRange = (maxLat - minLat + padding * 2) || 0.01;
  const lngRange = (maxLng - minLng + padding * 2) || 0.01;
  const mapRange = Math.max(latRange, lngRange);
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  const toX = (lng: number) => ((lng - centerLng) / mapRange + 0.5) * 100;
  const toY = (lat: number) => (0.5 - (lat - centerLat) / mapRange) * 100;

  const radiusDeg = radius / 111320;

  return (
    <div className="relative w-full h-64 bg-[#F0FDFA] border border-[#E2E8F0] rounded-lg overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <circle
          cx={toX(anchorLng)}
          cy={toY(anchorLat)}
          r={(radiusDeg / mapRange) * 100}
          fill="rgba(13, 148, 136, 0.1)"
          stroke="#0D9488"
          strokeWidth="0.3"
          strokeDasharray="1,1"
        />
        <circle cx={toX(anchorLng)} cy={toY(anchorLat)} r="1" fill="#0D9488" />
        <text x={toX(anchorLng)} y={toY(anchorLat) - 2} textAnchor="middle" fontSize="2.5" fill="#0D9488" fontWeight="bold">
          Mốc
        </text>

        {allPoints.slice(2).map((pt, i) => (
          <circle
            key={i}
            cx={toX(pt.lng)}
            cy={toY(pt.lat)}
            r="0.8"
            fill={pt.safe ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}
          />
        ))}

        <circle
          cx={toX(deviceLng)}
          cy={toY(deviceLat)}
          r="2"
          fill={isSafe ? "#22C55E" : "#EF4444"}
          stroke="white"
          strokeWidth="0.5"
        />
        <text x={toX(deviceLng)} y={toY(deviceLat) - 3} textAnchor="middle" fontSize="2.5" fill={isSafe ? "#16A34A" : "#DC2626"} fontWeight="bold">
          TB
        </text>

        <line
          x1={toX(anchorLng)}
          y1={toY(anchorLat)}
          x2={toX(deviceLng)}
          y2={toY(deviceLat)}
          stroke={isSafe ? "#22C55E" : "#EF4444"}
          strokeWidth="0.3"
          strokeDasharray="1,1"
        />
      </svg>

      <div className="absolute bottom-2 left-2 flex gap-3 text-[10px] text-[#64748B]">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-[#0D9488] rounded-full" /> Mốc
        </span>
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 ${isSafe ? "bg-green-500" : "bg-red-500"} rounded-full`} />
          Thiết bị
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 border border-[#0D9488] bg-[#0D9488]/10 rounded-full" />
          Vùng an toàn
        </span>
      </div>
    </div>
  );
}
