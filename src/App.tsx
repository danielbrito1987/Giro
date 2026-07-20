import React, { useState, useEffect, useRef } from "react";
import {
  Car,
  Wrench,
  Droplet,
  Bell,
  DollarSign,
  MessageSquare,
  Smartphone,
  Folder,
  Database,
  Navigation,
  FileText,
  CheckCircle,
  ChevronRight,
  Plus,
  Trash2,
  ArrowRight,
  Calendar,
  TrendingUp,
  Gauge,
  Info,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Cpu,
  Layers,
  Lock,
  User,
  MapPin,
  Activity,
  Award,
  BookOpen,
  Eye,
  Send,
  RefreshCw,
  Zap,
  Check,
  Camera,
  ScanLine,
  AlertTriangle,
  Upload,
  ShieldAlert
} from "lucide-react";
import {
  namingSuggestions,
  retentionLoops,
  monetizationTiers,
  seoKeywords,
  cleanArchitectureTree,
  domainModelsCode,
  databaseSchemaCode,
  useCasesList,
  navigationBlueprints
} from "./data/specs";

// Define TypeScript interfaces for our client-side state matching domain models
interface LocalVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  currentMileage: number;
  fuelType: string;
  purchaseDate: string;
  purchaseValue: number;
}

interface LocalMaintenance {
  id: string;
  vehicleId: string;
  type: string;
  date: string;
  mileage: number;
  cost: number;
  notes: string;
}

interface LocalFuelLog {
  id: string;
  vehicleId: string;
  date: string;
  gasStation: string;
  fuelType: string;
  pricePerLiter: number;
  totalLitres: number;
  totalCost: number;
  mileageAtRefuel: number;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export default function App() {
  // Global App Tab: specs vs simulator
  const [activeTab, setActiveTab] = useState<"product" | "arch" | "db" | "simulator">("simulator");

  // Option to toggle full-screen pure mobile app mode, removing the simulator frame & specs
  const [isPureAppMode, setIsPureAppMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024 || window.location.search.includes("pure=true");
    }
    return false;
  });

  const handleTogglePureMode = (value: boolean) => {
    setIsPureAppMode(value);
    if (value) {
      setActiveTab("simulator");
    }
  };
  
  // Arch inner tab switcher
  const [archTab, setArchTab] = useState<"structure" | "domain" | "cases" | "navigation">("structure");

  // Naming suggestions poll voting state
  const [votes, setVotes] = useState<{ [key: string]: number }>({
    "Giro": 32,
    "AutoCare": 14,
    "Motora": 8,
    "CarMente": 21
  });
  const [voted, setVoted] = useState<string | null>(null);

  const handleVote = (name: string) => {
    if (voted) return;
    setVotes(prev => ({ ...prev, [name]: prev[name] + 1 }));
    setVoted(name);
  };

  const totalVotes = (Object.values(votes) as number[]).reduce((a, b) => a + b, 0);

  // --- Giro Simulator State ---
  const [vehicles, setVehicles] = useState<LocalVehicle[]>([
    {
      id: "v-1",
      brand: "Chevrolet",
      model: "Onix 1.0 Turbo",
      year: 2023,
      plate: "GIR1234",
      currentMileage: 18450,
      fuelType: "Flex",
      purchaseDate: "2024-01-10",
      purchaseValue: 85000
    },
    {
      id: "v-2",
      brand: "Honda",
      model: "Civic Touring",
      year: 2021,
      plate: "PRM9876",
      currentMileage: 42300,
      fuelType: "Gasolina",
      purchaseDate: "2022-05-15",
      purchaseValue: 145000
    }
  ]);

  const [maintenances, setMaintenances] = useState<LocalMaintenance[]>([
    {
      id: "m-1",
      vehicleId: "v-1",
      type: "Troca de óleo",
      date: "2026-05-12",
      mileage: 15200,
      cost: 320,
      notes: "Óleo 5W30 Sintético e filtro de óleo originais."
    },
    {
      id: "m-2",
      vehicleId: "v-1",
      type: "Lavagem",
      date: "2026-07-01",
      mileage: 17800,
      cost: 80,
      notes: "Lavagem completa com cera."
    },
    {
      id: "m-3",
      vehicleId: "v-2",
      type: "Pneu",
      date: "2026-03-20",
      mileage: 39500,
      cost: 1200,
      notes: "Troca dos 2 pneus dianteiros Michelin."
    },
    {
      id: "m-4",
      vehicleId: "v-2",
      type: "Alinhamento",
      date: "2026-03-20",
      mileage: 39500,
      cost: 150,
      notes: "Alinhamento e balanceamento 3D."
    }
  ]);

  const [fuelLogs, setFuelLogs] = useState<LocalFuelLog[]>([
    {
      id: "f-1",
      vehicleId: "v-1",
      date: "2026-07-02",
      gasStation: "Posto Ipiranga",
      fuelType: "Gasolina",
      pricePerLiter: 5.89,
      totalLitres: 42.5,
      totalCost: 250.32,
      mileageAtRefuel: 17850
    },
    {
      id: "f-2",
      vehicleId: "v-1",
      date: "2026-07-15",
      gasStation: "Posto Shell",
      fuelType: "Gasolina",
      pricePerLiter: 5.95,
      totalLitres: 44.0,
      totalCost: 261.80,
      mileageAtRefuel: 18450
    },
    {
      id: "f-3",
      vehicleId: "v-2",
      date: "2026-06-10",
      gasStation: "Posto BR",
      fuelType: "Gasolina",
      pricePerLiter: 5.85,
      totalLitres: 50.0,
      totalCost: 292.50,
      mileageAtRefuel: 41100
    },
    {
      id: "f-4",
      vehicleId: "v-2",
      date: "2026-07-05",
      gasStation: "Posto Shell",
      fuelType: "Gasolina",
      pricePerLiter: 5.99,
      totalLitres: 48.5,
      totalCost: 290.51,
      mileageAtRefuel: 42300
    }
  ]);

  // Current Simulator View State (Simulating Smartphone Navigation)
  // Options: 'onboarding', 'app_dashboard', 'app_fuel_logs', 'app_maintenances', 'app_assistant'
  const [simView, setSimView] = useState<string>("app_dashboard");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("v-1");

  // Dashboard warning lights scanner state
  const [scannerImage, setScannerImage] = useState<string | null>(null);
  const [scannerPreset, setScannerPreset] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannerResult, setScannerResult] = useState<string | null>(null);
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [scanningProgressText, setScanningProgressText] = useState<string>("");

  // New forms states in Smartphone UI
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    brand: "",
    model: "",
    year: 2024,
    plate: "",
    currentMileage: 0,
    fuelType: "Flex",
    purchaseDate: new Date().toISOString().split("T")[0],
    purchaseValue: 0
  });

  const [showAddFuelModal, setShowAddFuelModal] = useState(false);
  const [newFuelLog, setNewFuelLog] = useState({
    gasStation: "",
    fuelType: "Gasolina",
    pricePerLiter: 5.89,
    totalLitres: 40,
    mileageAtRefuel: 0
  });

  const [showAddMaintModal, setShowAddMaintModal] = useState(false);
  const [newMaint, setNewMaint] = useState({
    type: "Troca de óleo",
    cost: 0,
    notes: "",
    mileage: 0
  });

  // Assistant chatbot states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "c-1",
      role: "assistant",
      text: "Olá! Sou o **Giro AI**, seu assistente inteligente de gestão veicular. Como posso te ajudar hoje?",
      timestamp: "11:30"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Calculations for selected vehicle
  const currentVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

  // Helper calculations for Dashboard
  const getVehicleFuelLogs = (vId: string) => fuelLogs.filter(f => f.vehicleId === vId).sort((a,b) => b.mileageAtRefuel - a.mileageAtRefuel);
  const getVehicleMaintenances = (vId: string) => maintenances.filter(m => m.vehicleId === vId).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculates Average Km/L for the selected vehicle based on consecutive refuels
  const calculateAverageEconomy = (vId: string) => {
    const logs = fuelLogs.filter(f => f.vehicleId === vId).sort((a,b) => a.mileageAtRefuel - b.mileageAtRefuel);
    if (logs.length < 2) return 10.5; // default simulated average
    
    // We compute total km driven and total fuel consumed over consecutive intervals
    let totalKm = 0;
    let totalLitres = 0;
    
    for (let i = 1; i < logs.length; i++) {
      const diffKm = logs[i].mileageAtRefuel - logs[i-1].mileageAtRefuel;
      if (diffKm > 0) {
        totalKm += diffKm;
        // liters consumed to refill to that point
        totalLitres += logs[i].totalLitres;
      }
    }
    
    if (totalLitres === 0) return 10.5;
    return parseFloat((totalKm / totalLitres).toFixed(2));
  };

  // Calculates total spent this year
  const calculateTotalSpentThisYear = (vId: string) => {
    const currentYear = 2026;
    const vehicleFuelLogs = fuelLogs.filter(f => f.vehicleId === vId && new Date(f.date).getFullYear() === currentYear);
    const vehicleMaintenances = maintenances.filter(m => m.vehicleId === vId && new Date(m.date).getFullYear() === currentYear);

    const fuelTotal = vehicleFuelLogs.reduce((acc, curr) => acc + curr.totalCost, 0);
    const maintTotal = vehicleMaintenances.reduce((acc, curr) => acc + curr.cost, 0);

    return {
      total: fuelTotal + maintTotal,
      fuel: fuelTotal,
      maintenance: maintTotal
    };
  };

  // Calculate overall cost per km
  const calculateCostPerKm = (vId: string) => {
    const logs = fuelLogs.filter(f => f.vehicleId === vId).sort((a, b) => a.mileageAtRefuel - b.mileageAtRefuel);
    const maints = maintenances.filter(m => m.vehicleId === vId);
    
    if (logs.length === 0) return 0;
    
    const minKm = logs[0].mileageAtRefuel;
    const maxKm = currentVehicle.currentMileage;
    const totalDist = maxKm - minKm;
    
    if (totalDist <= 0) return 0;

    const totalFuelCost = logs.reduce((acc, c) => acc + c.totalCost, 0);
    const totalMaintCost = maints.reduce((acc, c) => acc + c.cost, 0);
    
    return parseFloat(((totalFuelCost + totalMaintCost) / totalDist).toFixed(2));
  };

  // Scroll chat to bottom on new message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  // Handle addition of a vehicle
  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.brand || !newVehicle.model || !newVehicle.plate) {
      alert("Por favor preencha todos os campos obrigatórios");
      return;
    }
    const created: LocalVehicle = {
      id: `v-${Date.now()}`,
      brand: newVehicle.brand,
      model: newVehicle.model,
      year: Number(newVehicle.year),
      plate: newVehicle.plate.toUpperCase(),
      currentMileage: Number(newVehicle.currentMileage),
      fuelType: newVehicle.fuelType,
      purchaseDate: newVehicle.purchaseDate,
      purchaseValue: Number(newVehicle.purchaseValue)
    };

    setVehicles(prev => [...prev, created]);
    setSelectedVehicleId(created.id);
    setShowAddVehicleModal(false);
    
    // Add fake initial logs to populate graphs nicely for this custom car
    const fuelCreated: LocalFuelLog = {
      id: `f-fake-${Date.now()}`,
      vehicleId: created.id,
      date: new Date().toISOString().split("T")[0],
      gasStation: "Posto Shell",
      fuelType: created.fuelType === "Flex" ? "Gasolina" : created.fuelType,
      pricePerLiter: 5.95,
      totalLitres: 40,
      totalCost: 238,
      mileageAtRefuel: created.currentMileage
    };
    setFuelLogs(prev => [...prev, fuelCreated]);

    // Reset Form
    setNewVehicle({
      brand: "",
      model: "",
      year: 2024,
      plate: "",
      currentMileage: 0,
      fuelType: "Flex",
      purchaseDate: new Date().toISOString().split("T")[0],
      purchaseValue: 0
    });
  };

  // Handle addition of a Fuel Log
  const handleAddFuelLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFuelLog.gasStation || !newFuelLog.mileageAtRefuel || newFuelLog.mileageAtRefuel <= currentVehicle.currentMileage) {
      alert(`Por favor preencha um quilômetro superior à quilometragem atual do carro (${currentVehicle.currentMileage} km)`);
      return;
    }

    const cost = parseFloat((newFuelLog.pricePerLiter * newFuelLog.totalLitres).toFixed(2));
    const created: LocalFuelLog = {
      id: `f-${Date.now()}`,
      vehicleId: selectedVehicleId,
      date: new Date().toISOString().split("T")[0],
      gasStation: newFuelLog.gasStation,
      fuelType: newFuelLog.fuelType,
      pricePerLiter: Number(newFuelLog.pricePerLiter),
      totalLitres: Number(newFuelLog.totalLitres),
      totalCost: cost,
      mileageAtRefuel: Number(newFuelLog.mileageAtRefuel)
    };

    setFuelLogs(prev => [...prev, created]);
    
    // Update vehicle's current mileage
    setVehicles(prev => prev.map(v => {
      if (v.id === selectedVehicleId) {
        return { ...v, currentMileage: Number(newFuelLog.mileageAtRefuel) };
      }
      return v;
    }));

    setShowAddFuelModal(false);
    // Reset
    setNewFuelLog({
      gasStation: "",
      fuelType: "Gasolina",
      pricePerLiter: 5.89,
      totalLitres: 40,
      mileageAtRefuel: 0
    });
  };

  // Handle addition of a Maintenance log
  const handleAddMaint = (e: React.FormEvent) => {
    e.preventDefault();
    const maintMileage = newMaint.mileage || currentVehicle.currentMileage;
    
    const created: LocalMaintenance = {
      id: `m-${Date.now()}`,
      vehicleId: selectedVehicleId,
      type: newMaint.type,
      date: new Date().toISOString().split("T")[0],
      mileage: Number(maintMileage),
      cost: Number(newMaint.cost),
      notes: newMaint.notes
    };

    setMaintenances(prev => [...prev, created]);

    // If logged mileage is greater than vehicle's current mileage, update vehicle
    if (maintMileage > currentVehicle.currentMileage) {
      setVehicles(prev => prev.map(v => {
        if (v.id === selectedVehicleId) {
          return { ...v, currentMileage: Number(maintMileage) };
        }
        return v;
      }));
    }

    setShowAddMaintModal(false);
    setNewMaint({
      type: "Troca de óleo",
      cost: 0,
      notes: "",
      mileage: 0
    });
  };

  // Remove vehicle, refueling log, or maintenance log
  const handleDeleteVehicle = (id: string) => {
    if (vehicles.length <= 1) {
      alert("Não é possível remover o último veículo. Você precisa ter pelo menos um.");
      return;
    }
    if (confirm("Deseja realmente excluir este veículo? Todos os abastecimentos e manutenções dele serão apagados.")) {
      setVehicles(prev => prev.filter(v => v.id !== id));
      setFuelLogs(prev => prev.filter(f => f.vehicleId !== id));
      setMaintenances(prev => prev.filter(m => m.vehicleId !== id));
      // Select another vehicle
      const other = vehicles.find(v => v.id !== id);
      if (other) setSelectedVehicleId(other.id);
    }
  };

  const deleteFuelLog = (id: string) => {
    if (confirm("Remover este abastecimento?")) {
      setFuelLogs(prev => prev.filter(f => f.id !== id));
    }
  };

  const deleteMaintLog = (id: string) => {
    if (confirm("Remover este registro de manutenção?")) {
      setMaintenances(prev => prev.filter(m => m.id !== id));
    }
  };

  // Handle panel light scan request
  const handleScanDashboard = async (imgBase64: string, preset: string | null = null) => {
    setIsScanning(true);
    setScannerResult(null);
    setScannerError(null);
    setScannerImage(imgBase64);
    setScannerPreset(preset);

    const progressTexts = [
      "Iniciando rede neural Giro AI...",
      "Identificando padrões de cores e iluminação...",
      "Analisando símbolos de advertência acesos...",
      "Cruzando dados com boletins mecânicos...",
      "Gerando diagnóstico e recomendações seguras..."
    ];

    let progressIdx = 0;
    setScanningProgressText(progressTexts[0]);
    const progressInterval = setInterval(() => {
      progressIdx = (progressIdx + 1) % progressTexts.length;
      setScanningProgressText(progressTexts[progressIdx]);
    }, 1500);

    try {
      const res = await fetch("/api/scan-dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imgBase64, presetName: preset }),
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Erro de processamento no servidor.");
      }

      const data = await res.json();
      setScannerResult(data.text);
    } catch (err: any) {
      clearInterval(progressInterval);
      setScannerError(err.message || "Falha na comunicação com o serviço de diagnóstico Giro AI.");
    } finally {
      setIsScanning(false);
    }
  };

  // Chat request with server side Gemini
  const handleSendMessage = async (e?: React.FormEvent, presetQuery?: string) => {
    if (e) e.preventDefault();
    const query = presetQuery || userInput;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!presetQuery) setUserInput("");
    setIsTyping(true);

    try {
      // Package live context of current state to pass to Gemini
      const activeVehicleData = {
        vehicle: currentVehicle,
        mileage: currentVehicle.currentMileage,
        brand: currentVehicle.brand,
        model: currentVehicle.model,
        year: currentVehicle.year,
        plate: currentVehicle.plate,
        averageFuelEconomy: `${calculateAverageEconomy(selectedVehicleId)} Km/L`,
        costPerKm: `R$ ${calculateCostPerKm(selectedVehicleId)} / Km`,
        expensesThisYear: calculateTotalSpentThisYear(selectedVehicleId),
        maintenances: getVehicleMaintenances(selectedVehicleId).map(m => ({
          type: m.type,
          date: m.date,
          mileage: `${m.mileage} Km`,
          cost: `R$ ${m.cost}`,
          notes: m.notes
        })),
        refuelings: getVehicleFuelLogs(selectedVehicleId).map(f => ({
          date: f.date,
          station: f.gasStation,
          fuel: f.fuelType,
          litres: f.totalLitres,
          cost: `R$ ${f.totalCost}`,
          km: f.mileageAtRefuel
        }))
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: chatMessages.slice(-8).map(m => ({ role: m.role, text: m.text })),
          context: activeVehicleData
        })
      });

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        role: "assistant",
        text: data.text || "Desculpe, tive dificuldades para formular uma resposta no momento.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `msg-ai-err-${Date.now()}`,
        role: "assistant",
        text: "⚠️ Ocorreu um erro ao conectar ao servidor do assistente. Verifique se o servidor está ativo.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Helper stats
  const selectedVehicleEconomy = calculateAverageEconomy(selectedVehicleId);
  const selectedVehicleExpenses = calculateTotalSpentThisYear(selectedVehicleId);
  const selectedVehicleCostPerKm = calculateCostPerKm(selectedVehicleId);

  // Quick automated reminders for the current active vehicle
  const getActiveReminders = (vehicle: LocalVehicle) => {
    const list = [];
    
    // Oil change reminder logic: oil change every 10,000 km.
    const oilMaints = maintenances.filter(m => m.vehicleId === vehicle.id && m.type.toLowerCase().includes("óleo"));
    if (oilMaints.length > 0) {
      const lastOilKm = oilMaints[0].mileage;
      const drivenSince = vehicle.currentMileage - lastOilKm;
      const remaining = 10000 - drivenSince;
      if (remaining <= 1000) {
        list.push({
          type: "danger",
          title: "Troca de óleo vencida ou próxima!",
          desc: `Última troca feita com ${lastOilKm} Km. Você já rodou ${drivenSince} Km. Agende imediatamente.`
        });
      } else {
        list.push({
          type: "info",
          title: "Troca de óleo regular",
          desc: `Restam aproximadamente ${remaining} Km para a próxima troca de óleo de rotina.`
        });
      }
    } else {
      list.push({
        type: "warning",
        title: "Sem registro de troca de óleo",
        desc: "Nenhum histórico de troca de óleo encontrado. Recomendamos registrar ou realizar a manutenção preventiva."
      });
    }

    // IPVA, Licensing, Insurance mock deadlines
    if (vehicle.id === "v-1") {
      list.push({
        type: "warning",
        title: "IPVA Próximo do Vencimento",
        desc: "A cota única ou 1ª parcela vence em 10 dias úteis para placas com final 4."
      });
      list.push({
        type: "info",
        title: "Seguro Allianz ativo",
        desc: "Vencimento da apólice em 25/11/2026. Renovação automática habilitada."
      });
    } else {
      list.push({
        type: "danger",
        title: "Seguro Vencendo Amanhã!",
        desc: "O seguro do Civic Touring Allianz vence amanhã. Entre em contato com seu corretor."
      });
      list.push({
        type: "info",
        title: "Licenciamento Anual OK",
        desc: "Exercício 2026 regularizado e disponível digitalmente no aplicativo CDT."
      });
    }

    return list;
  };

  return (
    <div className={`min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-indigo-600 selection:text-white relative overflow-hidden ${isPureAppMode ? 'flex flex-col' : ''}`}>
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Float badge for Pure App Mode */}
      {isPureAppMode && (
        <button
          onClick={() => handleTogglePureMode(false)}
          className="fixed top-4 right-4 z-50 bg-zinc-900/95 hover:bg-zinc-800 text-zinc-300 border border-white/10 px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md shadow-2xl shadow-black"
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Voltar ao Protótipo Completo</span>
        </button>
      )}

      {/* Top Header / Brand Board */}
      {!isPureAppMode && (
        <header className="border-b border-white/5 bg-[#09090B]/90 sticky top-0 z-30 backdrop-blur-md px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-950/30">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded-full">
                    Flutter App Spec & Prototype
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">v1.0.0</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mt-0.5">
                  Giro <span className="text-xs text-zinc-400 font-normal">| Gestão Inteligente de Veículos</span>
                </h1>
              </div>
            </div>

            {/* Navigation Control & Pure App Toggle */}
            <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
              <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5 overflow-x-auto shrink-0">
                <button
                  onClick={() => setActiveTab("simulator")}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "simulator"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/30"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Giro App Simulator
                </button>
                <button
                  onClick={() => setActiveTab("product")}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "product"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/30"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  1. Engenharia de Produto
                </button>
                <button
                  onClick={() => setActiveTab("arch")}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "arch"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/30"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  2. Arquitetura Flutter
                </button>
                <button
                  onClick={() => setActiveTab("db")}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "db"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/30"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <Database className="w-4 h-4" />
                  3. Banco de Dados
                </button>
              </div>

              {/* High Contrast Pure App Mode Button */}
              <button
                onClick={() => handleTogglePureMode(true)}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-950/40 border border-indigo-500/30 transition-all cursor-pointer"
                title="Modo App Puro (Ocultar simulador e especificações)"
              >
                <Smartphone className="w-4 h-4" />
                <span>Modo App Puro</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Container */}
      <main className={isPureAppMode ? "flex-1 flex items-center justify-center w-full p-0 md:p-4" : "max-w-7xl mx-auto p-6"}>
        
        {/* ==================================================================== */}
        {/* TAB 1: PRODUCT ENGINEERING */}
        {/* ==================================================================== */}
        {activeTab === "product" && (
          <div className="space-y-8 animate-fade-in">
            {/* Header / Intro */}
            <div className="bg-zinc-900/40 rounded-2xl border border-white/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Visão Estratégica do Produto</h2>
              <p className="text-zinc-400 max-w-4xl text-sm leading-relaxed">
                Nesta etapa inicial de engenharia de produto, projetamos o Giro para ser mais do que apenas uma planilha de despesas automotivas. Nosso foco é <strong>utilidade pura e conveniência preditiva</strong> para proprietários comuns de carros, eliminando a barreira de jargões técnicos de mecânica e proporcionando alta retenção diária através de gatilhos automáticos inteligentes.
              </p>
            </div>

            {/* Interactive Naming Poll */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-zinc-900/40 rounded-2xl border border-white/5 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-400 mb-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Product Voting</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Qual o melhor nome?</h3>
                  <p className="text-xs text-zinc-400 mb-6">Vote nas propostas conceituais criadas pelo nosso time de PM e veja a justificativa de branding.</p>
                  
                  <div className="space-y-3">
                    {namingSuggestions.map(item => {
                      const percentage = totalVotes > 0 ? Math.round((votes[item.name] / totalVotes) * 100) : 0;
                      const isVotedThis = voted === item.name;
                      return (
                        <button
                          key={item.name}
                          onClick={() => handleVote(item.name)}
                          disabled={voted !== null}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all relative overflow-hidden group ${
                            isVotedThis 
                              ? "bg-indigo-950/25 border-indigo-500/30" 
                              : "bg-zinc-950/60 border-white/5 hover:border-white/10"
                          }`}
                        >
                          {/* Progress bar background for votes */}
                          {voted && (
                            <div 
                              className="absolute top-0 left-0 bottom-0 bg-indigo-500/10 transition-all duration-1000"
                              style={{ width: `${percentage}%` }}
                            />
                          )}
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="font-bold text-white text-sm">{item.name}</span>
                            {voted ? (
                              <span className="text-xs font-mono font-bold text-indigo-400">{percentage}% ({votes[item.name]})</span>
                            ) : (
                              <span className="text-xs text-zinc-500 group-hover:text-white transition-colors">Votar</span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400 mt-1.5 relative z-10 line-clamp-2">{item.reason}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {voted && (
                  <p className="text-xs text-center text-indigo-400 font-mono mt-4">
                    ✓ Obrigado pelo feedback! Nome sugerido salvo nos metadados.
                  </p>
                )}
              </div>

              {/* Retention Loops list */}
              <div className="lg:col-span-2 bg-zinc-900/40 rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-2 text-emerald-500 mb-3">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Retention Hooks</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Mecanismos de Retenção & Engajamento</h3>
                <p className="text-xs text-zinc-400 mb-6">Como faremos o usuário voltar ao aplicativo voluntariamente de forma consistente.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {retentionLoops.map((loop, idx) => (
                    <div key={idx} className="bg-zinc-950/50 border border-white/5 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-white">
                        <span className="text-xs font-mono font-bold bg-zinc-900 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-950/40">
                          Hook #0{idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">{loop.title}</h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{loop.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monetization & Premium Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/40 rounded-2xl border border-white/5 p-6">
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Info className="w-5 h-5 text-zinc-400" /> Planos de Monetização (Startup Model)
                </h3>
                <p className="text-xs text-zinc-400 mb-6">Proposta freemium escalável com apelo comercial imediato.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zinc-950/40 rounded-xl border border-white/5 p-4">
                    <span className="text-xs uppercase font-mono tracking-wider text-zinc-500 font-bold block mb-1">FREE</span>
                    <span className="text-xl font-bold text-white">R$ 0</span>
                    <p className="text-xs text-zinc-400 mt-1 mb-4">Essencial para quem quer apenas testar</p>
                    <ul className="space-y-2">
                      {monetizationTiers.free.map((item, idx) => (
                        <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-indigo-950/10 rounded-xl border border-indigo-500/20 p-4 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl" />
                    <span className="text-xs uppercase font-mono tracking-wider text-indigo-400 font-bold block mb-1">PREMIUM PRO</span>
                    <span className="text-xl font-bold text-white">R$ 9,90 <span className="text-xs font-normal text-zinc-400">/mês</span></span>
                    <p className="text-xs text-indigo-300 mt-1 mb-4">Total controle inteligente e paz de espírito</p>
                    <ul className="space-y-2">
                      {monetizationTiers.premium.map((item, idx) => (
                        <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Play Store Optimization / ASO */}
              <div className="bg-zinc-900/40 rounded-2xl border border-white/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" /> ASO & Play Store Setup (SEO Pronto)
                  </h3>
                  <p className="text-xs text-zinc-400 mb-6">Estratégia de ranqueamento orgânico para Play Store desde o dia 1.</p>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Título Recomendado (ASO-Ready)</span>
                      <div className="bg-zinc-950/60 px-3 py-2 rounded-lg border border-white/5 text-xs text-white font-medium mt-1">
                        {seoKeywords.title}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Descrição Curta (Conversão)</span>
                      <div className="bg-zinc-950/60 px-3 py-2 rounded-lg border border-white/5 text-xs text-zinc-400 mt-1">
                        {seoKeywords.shortDescription}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Keywords Foco (SEO)</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {seoKeywords.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-indigo-950/30 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-900/30">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-950/40 border border-white/5 rounded-xl p-3 mt-4 text-xs text-zinc-400 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">LGPD & Privacidade:</strong> Coleta mínima de dados, criptografia AES-256 local no celular do usuário (Isar/Drift) e política de privacidade transparente para atender às diretrizes rígidas do Google Play.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* ==================================================================== */}
        {/* TAB 2: ARCHITECTURE & CLEAN ARCH */}
        {/* ==================================================================== */}
        {activeTab === "arch" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header / Intro */}
            <div className="bg-zinc-900/40 rounded-2xl border border-white/5 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Arquitetura de Software</h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-4xl">
                O Giro é planejado sob as diretrizes de <strong>Clean Architecture</strong>, estruturado no modelo <strong>Feature-First</strong> (Divisão por funcionalidades). Para gerência de estados, adotamos o <strong>Riverpod</strong> pela estabilidade e isolamento de dependências, com navegação tipada via <strong>GoRouter</strong> e banco offline reativo usando <strong>Drift</strong>.
              </p>
            </div>

            {/* Architecture Inner Tabs */}
            <div className="flex border-b border-white/5 gap-2">
              <button
                onClick={() => setArchTab("structure")}
                className={`pb-3 px-2 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                  archTab === "structure"
                    ? "border-indigo-500 text-white"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                <Folder className="w-4 h-4 inline mr-1.5" />
                Estrutura de Pastas
              </button>
              <button
                onClick={() => setArchTab("domain")}
                className={`pb-3 px-2 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                  archTab === "domain"
                    ? "border-indigo-500 text-white"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                <Cpu className="w-4 h-4 inline mr-1.5" />
                Domain Model (Dart)
              </button>
              <button
                onClick={() => setArchTab("cases")}
                className={`pb-3 px-2 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                  archTab === "cases"
                    ? "border-indigo-500 text-white"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-1.5" />
                Casos de Uso
              </button>
              <button
                onClick={() => setArchTab("navigation")}
                className={`pb-3 px-2 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                  archTab === "navigation"
                    ? "border-indigo-500 text-white"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                <Navigation className="w-4 h-4 inline mr-1.5" />
                Navegação GoRouter
              </button>
            </div>

            {/* Structure Content */}
            {archTab === "structure" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-zinc-900/40 rounded-2xl border border-white/5 p-6">
                  <h3 className="text-md font-bold text-white mb-2">Feature-First Folder Layout</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Isola cada domínio de negócio em sua respectiva pasta. Facilita o desenvolvimento em times grandes e evita conflitos em commits do Git. Cada funcionalidade contém suas 3 camadas internas: Domain, Data, Presentation.
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-zinc-950/60 rounded-xl border border-white/5 text-xs">
                      <strong className="text-white block mb-1">Domain (Regra pura)</strong>
                      Isolada de bibliotecas ou UI. Contém os modelos de dados cruas, contratos de repositórios e casos de uso específicos.
                    </div>
                    <div className="p-3 bg-zinc-950/60 rounded-xl border border-white/5 text-xs">
                      <strong className="text-white block mb-1">Data (Implementação)</strong>
                      Contém as implementações dos repositórios, tratamento de requisições de rede, cache local, serializações e acesso ao Drift DB.
                    </div>
                    <div className="p-3 bg-zinc-950/60 rounded-xl border border-white/5 text-xs">
                      <strong className="text-white block mb-1">Presentation (Interface)</strong>
                      Telas (Screens), componentes customizados (Widgets) e lógica de reatividade de estados controlados por Providers do Riverpod.
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-zinc-900/40 rounded-2xl border border-white/5 p-6 overflow-hidden">
                  <span className="text-xs text-zinc-400 font-mono block mb-2">Estrutura Física do Projeto Flutter:</span>
                  <pre className="bg-zinc-950/60 text-zinc-300 p-4 rounded-xl border border-white/5 text-xs font-mono overflow-y-auto max-h-[450px]">
                    {cleanArchitectureTree}
                  </pre>
                </div>
              </div>
            )}

            {/* Domain Models content */}
            {archTab === "domain" && (
              <div className="bg-zinc-900/40 rounded-2xl border border-white/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-md font-bold text-white">Entidades de Domínio</h3>
                    <p className="text-xs text-zinc-400">Modelos imutáveis do domínio puro do Flutter livre de dependências externas.</p>
                  </div>
                  <span className="text-xs bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 px-2 py-0.5 rounded-full font-mono">domain_entities.dart</span>
                </div>
                <pre className="bg-zinc-950/60 text-zinc-300 p-4 rounded-xl border border-white/5 text-xs font-mono overflow-x-auto">
                  {domainModelsCode}
                </pre>
              </div>
            )}

            {/* Use Cases content */}
            {archTab === "cases" && (
              <div className="bg-zinc-900/40 rounded-2xl border border-white/5 p-6">
                <h3 className="text-md font-bold text-white mb-2">Casos de Uso (Mapeamento Funcional)</h3>
                <p className="text-xs text-zinc-400 mb-6">Classes especialistas de caso de uso único (Single Responsibility Principle) para orquestrar as regras de negócio.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {useCasesList.map((uc, idx) => (
                    <div key={idx} className="bg-zinc-950/60 border border-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                          MÓDULO: {uc.feature.toUpperCase()}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {uc.cases.map((c, cIdx) => {
                          const [title, desc] = c.split(":");
                          return (
                            <li key={cIdx} className="text-xs text-zinc-400 leading-relaxed pl-3 border-l border-white/10">
                              <strong className="text-white block">{title}</strong>
                              {desc}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation blueprint */}
            {archTab === "navigation" && (
              <div className="bg-zinc-900/40 rounded-2xl border border-white/5 p-6">
                <h3 className="text-md font-bold text-white mb-1">Rotas de Navegação (Declarativas)</h3>
                <p className="text-xs text-zinc-400 mb-6">Mapeamento linear da árvore de navegação usando GoRouter.</p>
                <pre className="bg-zinc-950/60 text-zinc-300 p-4 rounded-xl border border-white/5 text-xs font-mono overflow-x-auto">
                  {navigationBlueprints}
                </pre>
              </div>
            )}
          </div>
        )}


        {/* ==================================================================== */}
        {/* TAB 3: DATABASE SCHEMA (DRIFT) */}
        {/* ==================================================================== */}
        {activeTab === "db" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header / Intro */}
            <div className="bg-zinc-900/40 rounded-2xl border border-white/5 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Modelagem SQL do Banco de Dados</h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-4xl">
                Para a estratégia de persistência <strong>Offline-First</strong>, sugerimos a utilização do <strong>Drift</strong> (antigo Moor) para o Flutter. O Drift é um ORM reativo de alta performance que traduz tabelas Dart em tabelas relacionais SQLite nativas, fornecendo integridade referencial por chaves estrangeiras e queries reativas com Streams do Dart.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Database relational overview schema card */}
              <div className="lg:col-span-1 bg-zinc-900/40 rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-2 text-indigo-400 mb-3">
                  <Database className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Relational Schema</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Estrutura das Tabelas</h3>
                <p className="text-xs text-zinc-400 mb-6">Integridade e cascadeamento físico garantido por chaves estrangeiras.</p>

                <div className="space-y-4 text-xs font-mono">
                  {/* Vehicles Table Map */}
                  <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 space-y-2">
                    <div className="text-white font-bold border-b border-white/5 pb-1 flex justify-between">
                      <span>👤 Vehicles (PK: id)</span>
                      <span className="text-[10px] text-zinc-500">Master</span>
                    </div>
                    <ul className="space-y-1 text-zinc-400">
                      <li>• id <span className="text-zinc-600">(TEXT - PK)</span></li>
                      <li>• brand <span className="text-zinc-600">(TEXT)</span></li>
                      <li>• model <span className="text-zinc-600">(TEXT)</span></li>
                      <li>• year <span className="text-zinc-600">(INTEGER)</span></li>
                      <li>• plate <span className="text-zinc-600">(TEXT)</span></li>
                      <li>• currentMileage <span className="text-zinc-600">(INTEGER)</span></li>
                      <li>• fuelType <span className="text-zinc-600">(TEXT)</span></li>
                      <li>• purchaseDate <span className="text-zinc-600">(DATETIME)</span></li>
                      <li>• purchaseValue <span className="text-zinc-600">(REAL)</span></li>
                    </ul>
                  </div>

                  {/* Maintenances Table Map */}
                  <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 space-y-2">
                    <div className="text-white font-bold border-b border-white/5 pb-1 flex justify-between">
                      <span>🛠 Maintenances (PK: id)</span>
                      <span className="text-[10px] text-indigo-400">FK Cascade</span>
                    </div>
                    <ul className="space-y-1 text-zinc-400">
                      <li>• id <span className="text-zinc-600">(TEXT - PK)</span></li>
                      <li>• vehicleId <span className="text-indigo-400">(TEXT - FK references Vehicles.id)</span></li>
                      <li>• type <span className="text-zinc-600">(TEXT)</span></li>
                      <li>• date <span className="text-zinc-600">(DATETIME)</span></li>
                      <li>• mileage <span className="text-zinc-600">(INTEGER)</span></li>
                      <li>• cost <span className="text-zinc-600">(REAL)</span></li>
                      <li>• notes <span className="text-zinc-600">(TEXT - NULLABLE)</span></li>
                    </ul>
                  </div>

                  {/* Fuel Logs Table Map */}
                  <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 space-y-2">
                    <div className="text-white font-bold border-b border-white/5 pb-1 flex justify-between">
                      <span>⛽ FuelLogs (PK: id)</span>
                      <span className="text-[10px] text-indigo-400">FK Cascade</span>
                    </div>
                    <ul className="space-y-1 text-zinc-400">
                      <li>• id <span className="text-zinc-600">(TEXT - PK)</span></li>
                      <li>• vehicleId <span className="text-indigo-400">(TEXT - FK references Vehicles.id)</span></li>
                      <li>• date <span className="text-zinc-600">(DATETIME)</span></li>
                      <li>• gasStation <span className="text-zinc-600">(TEXT)</span></li>
                      <li>• fuelType <span className="text-zinc-600">(TEXT)</span></li>
                      <li>• pricePerLiter <span className="text-zinc-600">(REAL)</span></li>
                      <li>• totalLitres <span className="text-zinc-600">(REAL)</span></li>
                      <li>• totalCost <span className="text-zinc-600">(REAL)</span></li>
                      <li>• mileageAtRefuel <span className="text-zinc-600">(INTEGER)</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Database ORM Code display (Drift Code) */}
              <div className="lg:col-span-2 bg-zinc-900/40 rounded-2xl border border-white/5 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-md font-bold text-white">Declarativo de Tabelas Drift (Flutter)</h3>
                      <p className="text-xs text-zinc-400">Mapeamento de chaves estrangeiras, limites de tamanho de strings e indexação robusta no SQLite local.</p>
                    </div>
                    <span className="text-xs bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 px-2 py-0.5 rounded-full font-mono">drift_schema.dart</span>
                  </div>
                  <pre className="bg-zinc-950/60 text-zinc-300 p-4 rounded-xl border border-white/5 text-xs font-mono overflow-y-auto max-h-[400px]">
                    {databaseSchemaCode}
                  </pre>
                </div>

                <div className="bg-indigo-950/10 border border-indigo-500/20 rounded-xl p-4 mt-4 text-xs text-indigo-300 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Offline-First Sincronizado</strong>
                    O banco de dados drift pode gerar listeners que disparam gatilhos para que, quando houver conexão com a internet, as tabelas sejam enviadas em background para um endpoint Firebase/Supabase e criptografadas localmente com chaves guardadas no Android Keystore (via flutter_secure_storage).
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* ==================================================================== */}
        {/* TAB 4: APP SIMULATOR (THE ABSOLUTE SHOWCASE) */}
        {/* ==================================================================== */}
        {activeTab === "simulator" && (
          <div className="space-y-6 animate-fade-in">
            {/* Simulation Sandbox header */}
            <div className="bg-zinc-900/40 rounded-2xl border border-white/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Simulador Ativo (Giro Android Sandbox)</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Protótipo de Alta Fidelidade (MVP)</h2>
                <p className="text-zinc-400 text-sm max-w-2xl mt-0.5">
                  Explore e insira manutenções ou abastecimentos reais abaixo no smartphone simulado. Seus cálculos de eficiência Km/L, custo por Km e gastos totais se atualizam instantaneamente. Você também pode conversar com o <strong>Giro AI</strong> no chat integrado!
                </p>
              </div>

              {/* Quick instructions indicator */}
              <div className="bg-zinc-950/60 px-4 py-3 rounded-xl border border-white/5 shrink-0 flex items-center gap-3">
                <Info className="w-5 h-5 text-indigo-400 shrink-0" />
                <div className="text-xs">
                  <span className="text-zinc-300 block font-semibold">Offline State Ativo</span>
                  <span className="text-zinc-400">Os dados digitados são simulados em memória!</span>
                </div>
              </div>
            </div>

            {/* Simulated Workstation layout */}
            <div className={isPureAppMode ? "w-full h-full flex items-center justify-center" : "grid grid-cols-1 xl:grid-cols-12 gap-8 items-start"}>
              
              {/* Left Sandbox Column: State inspector and controls */}
              {!isPureAppMode && (
                <div className="xl:col-span-4 space-y-6 order-2 xl:order-1">
                  <div className="bg-zinc-900/40 rounded-2xl border border-white/5 p-5">
                    <h3 className="text-md font-bold text-white mb-2 flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-indigo-400" /> Inspetor de Estado Local (Drift DB)
                    </h3>
                    <p className="text-xs text-zinc-400 mb-4">
                      Visualize o estado dinâmico que o Flutter armazenaria em seu SQLite local. Modificações feitas no smartphone se refletem aqui em tempo real.
                    </p>

                    <div className="space-y-3">
                      {/* Active Vehicle Status info */}
                      <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3">
                        <span className="text-[10px] text-zinc-500 font-mono block">CARRO SELECIONADO</span>
                        <strong className="text-white text-sm block mt-0.5">{currentVehicle.brand} {currentVehicle.model}</strong>
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/5 text-xs">
                          <div>
                            <span className="text-zinc-500 block text-[10px]">ODÔMETRO ATUAL</span>
                            <span className="text-indigo-400 font-bold font-mono">{currentVehicle.currentMileage.toLocaleString()} km</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[10px]">MÉDIA KM/L</span>
                            <span className="text-emerald-400 font-bold font-mono">{selectedVehicleEconomy} Km/L</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-zinc-500 block text-[10px]">CUSTO TOTAL NO ANO (2026)</span>
                            <span className="text-white font-mono">R$ {selectedVehicleExpenses.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick simulated controls */}
                      <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3 space-y-3">
                        <span className="text-[10px] text-zinc-500 font-mono block">MÉTODOS DE TESTE</span>
                        
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setFuelLogs([]);
                              setMaintenances([]);
                              alert("Historico limpo! O dashboard e o assistente Giro AI refletirão a ausência de dados.");
                            }}
                            className="w-full text-center bg-red-950/20 border border-red-900/40 hover:bg-red-950/45 text-red-300 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                          >
                            Limpar Todo Histórico de Dados
                          </button>
                          
                          <button
                            onClick={() => {
                              // Reset back to initial state
                              setVehicles([
                                {
                                  id: "v-1",
                                  brand: "Chevrolet",
                                  model: "Onix 1.0 Turbo",
                                  year: 2023,
                                  plate: "GIR1234",
                                  currentMileage: 18450,
                                  fuelType: "Flex",
                                  purchaseDate: "2024-01-10",
                                  purchaseValue: 85000
                                },
                                {
                                  id: "v-2",
                                  brand: "Honda",
                                  model: "Civic Touring",
                                  year: 2021,
                                  plate: "PRM9876",
                                  currentMileage: 42300,
                                  fuelType: "Gasolina",
                                  purchaseDate: "2022-05-15",
                                  purchaseValue: 145000
                                }
                              ]);
                              setMaintenances([
                                {
                                  id: "m-1",
                                  vehicleId: "v-1",
                                  type: "Troca de óleo",
                                  date: "2026-05-12",
                                  mileage: 15200,
                                  cost: 320,
                                  notes: "Óleo 5W30 Sintético e filtro de óleo originais."
                                },
                                {
                                  id: "m-2",
                                  vehicleId: "v-1",
                                  type: "Lavagem",
                                  date: "2026-07-01",
                                  mileage: 17800,
                                  cost: 80,
                                  notes: "Lavagem completa com cera."
                                }
                              ]);
                              setFuelLogs([
                                {
                                  id: "f-1",
                                  vehicleId: "v-1",
                                  date: "2026-07-02",
                                  gasStation: "Posto Ipiranga",
                                  fuelType: "Gasolina",
                                  pricePerLiter: 5.89,
                                  totalLitres: 42.5,
                                  totalCost: 250.32,
                                  mileageAtRefuel: 17850
                                },
                                {
                                  id: "f-2",
                                  vehicleId: "v-1",
                                  date: "2026-07-15",
                                  gasStation: "Posto Shell",
                                  fuelType: "Gasolina",
                                  pricePerLiter: 5.95,
                                  totalLitres: 44.0,
                                  totalCost: 261.80,
                                  mileageAtRefuel: 18450
                                }
                              ]);
                              alert("Estado resetado com sucesso para os dados iniciais.");
                            }}
                            className="w-full text-center bg-zinc-800 hover:bg-zinc-700 text-white py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                          >
                            Restaurar Dados Originais
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UX Design Specs block */}
                  <div className="bg-zinc-900/40 rounded-2xl border border-white/5 p-5 space-y-3">
                    <h3 className="text-md font-bold text-white flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-500" /> Diretrizes de Visual UX
                    </h3>
                    <div className="text-xs text-zinc-400 space-y-2.5">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold shrink-0">1.</span>
                        <div>
                          <strong className="text-white">Inspirado em Linear e Tesla:</strong> Cores escuras profundas, fontes sem-serifas robustas, alto contraste, outlines finas e discretas (0.5px) com visual extremamente clean.
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold shrink-0">2.</span>
                        <div>
                          <strong className="text-white">Material 3 Moderno:</strong> Bottom navigation bar arredondada, floating action buttons integrados para registro de eventos com um clique e cards táteis macios.
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold shrink-0">3.</span>
                        <div>
                          <strong className="text-white">Preocupação Mecânica Zero:</strong> O usuário vê apenas prazos e estatísticas amigáveis como "Próxima revisão daqui 3.200 km".
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* Smartphone Simulator Shell Column */}
              <div className={isPureAppMode ? "w-full h-full flex justify-center items-center" : "xl:col-span-8 flex justify-center order-1 xl:order-2"}>
                <div className={isPureAppMode
                  ? "relative w-full h-screen md:max-w-[420px] md:h-[860px] bg-black md:rounded-[48px] p-0 md:p-4 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] md:border-[10px] md:border-zinc-800 flex flex-col overflow-hidden"
                  : "relative w-full max-w-[420px] aspect-[9/19] min-h-[780px] bg-black rounded-[48px] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-[10px] border-zinc-800 flex flex-col overflow-hidden"
                }>
                  
                  {/* Smartphone Top Speaker & Camera Notch */}
                  <div className={`${isPureAppMode ? 'hidden md:flex absolute' : 'absolute flex'} top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-40 items-center justify-center`}>
                    <div className="w-12 h-1 bg-zinc-800 rounded-full mb-1 mr-2" />
                    <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full mb-1" />
                  </div>

                  {/* Smartphone Screen Inner Container */}
                  <div className={`w-full h-full bg-[#09090B] ${isPureAppMode ? 'rounded-none md:rounded-[36px]' : 'rounded-[36px]'} overflow-hidden relative flex flex-col`}>
                    
                    {/* Simulated OS StatusBar */}
                    <div className="h-10 bg-[#09090B] px-6 pt-3 flex items-center justify-between text-[11px] font-mono text-zinc-500 font-semibold z-20 shrink-0 select-none">
                      <span>11:31</span>
                      <div className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Giro AI LITE</span>
                        <span className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse" />
                      </div>
                    </div>

                    {/* Smartphone Header / Vehicle Switcher */}
                    <div className="bg-zinc-900/40 px-4 py-3 border-b border-white/5 flex items-center justify-between z-10 shrink-0 select-none">
                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20 text-indigo-400">
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <select
                            value={selectedVehicleId}
                            onChange={(e) => setSelectedVehicleId(e.target.value)}
                            className="bg-transparent text-sm font-bold text-white border-none outline-none pr-6 cursor-pointer"
                          >
                            {vehicles.map(v => (
                              <option key={v.id} value={v.id} className="bg-zinc-900 text-white">
                                {v.brand} {v.model}
                              </option>
                            ))}
                          </select>
                          <span className="text-[9px] text-zinc-500 block font-mono">PLACA: {currentVehicle.plate}</span>
                        </div>
                      </div>

                      {/* Add Vehicle Button in smartphone */}
                      <button
                        onClick={() => setShowAddVehicleModal(true)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white p-1.5 rounded-lg border border-white/5 flex items-center justify-center cursor-pointer transition-all"
                        title="Adicionar Veículo"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* ============================================== */}
                    {/* VIEW: DASHBOARD */}
                    {/* ============================================== */}
                    {simView === "app_dashboard" && (
                      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 select-none pb-20">
                        {/* Summary Widget */}
                        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 relative overflow-hidden">
                          <div className="absolute right-2 top-2 bg-indigo-500/10 p-1.5 rounded-lg border border-indigo-500/20 text-indigo-400">
                            <Activity className="w-4 h-4" />
                          </div>
                          
                          <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 font-bold">Resumo do Carro (2026)</span>
                          <h4 className="text-lg font-bold text-white mt-1">Giro Score: <span className="text-emerald-400">92/100</span></h4>
                          <p className="text-xs text-zinc-400 leading-relaxed mt-1">Sua manutenção preventiva está impecável! Você economizou ao abastecer no Posto Shell.</p>

                          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/5">
                            <div>
                              <span className="text-zinc-500 block text-[9px] font-mono">ODÔMETRO</span>
                              <span className="text-sm font-bold text-white font-mono">{currentVehicle.currentMileage.toLocaleString()} km</span>
                            </div>
                            <div>
                              <span className="text-zinc-500 block text-[9px] font-mono">CUSTO POR KM</span>
                              <span className="text-sm font-bold text-indigo-400 font-mono">R$ {selectedVehicleCostPerKm}</span>
                            </div>
                          </div>
                        </div>

                        {/* Reminders / Alert System (Preditivo) */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-zinc-400 font-mono uppercase tracking-wider">Alertas & Notificações</span>
                            <span className="text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-950 px-2 py-0.5 rounded-full">Automático</span>
                          </div>

                          <div className="space-y-2">
                            {getActiveReminders(currentVehicle).map((alertItem, idx) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-xl border flex gap-2.5 items-start text-xs ${
                                  alertItem.type === "danger"
                                    ? "bg-red-950/15 border-red-900/40 text-red-300"
                                    : alertItem.type === "warning"
                                    ? "bg-amber-950/15 border-amber-900/40 text-amber-300"
                                    : "bg-indigo-950/10 border-indigo-900/30 text-indigo-300"
                                }`}
                              >
                                {alertItem.type === "danger" ? (
                                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                                ) : (
                                  <Bell className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                                )}
                                <div>
                                  <strong className="text-white block font-semibold">{alertItem.title}</strong>
                                  <span className="text-[11px] text-zinc-400 leading-relaxed block mt-0.5">{alertItem.desc}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Dashboard Stats Panel */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-zinc-900/20 border border-white/5 p-3.5 rounded-xl space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] text-zinc-400 font-mono uppercase">CONC. MÉDIO</span>
                              <Droplet className="w-3.5 h-3.5 text-emerald-500" />
                            </div>
                            <span className="text-lg font-bold text-white block font-mono">{selectedVehicleEconomy} <span className="text-xs font-normal text-zinc-400">km/L</span></span>
                            <p className="text-[10px] text-zinc-500 font-mono">Consumo acumulado</p>
                          </div>

                          <div className="bg-zinc-900/20 border border-white/5 p-3.5 rounded-xl space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] text-zinc-400 font-mono uppercase">GASTOS 2026</span>
                              <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
                            </div>
                            <span className="text-lg font-bold text-white block font-mono">R$ {selectedVehicleExpenses.total.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}</span>
                            <p className="text-[10px] text-zinc-500 font-mono">Manutenção + Combustível</p>
                          </div>
                        </div>

                        {/* Dynamic consumption graph simulator */}
                        <div className="bg-zinc-900/20 border border-white/5 rounded-xl p-3.5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] text-zinc-400 font-mono uppercase">Histórico de Eficiência (Km/L)</span>
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                          </div>
                          
                          {/* Beautiful simulated micro line chart */}
                          <div className="h-20 flex items-end justify-between gap-1 pt-3">
                            <div className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-indigo-900/10 rounded-t h-12 flex items-end justify-center relative group">
                                <div className="absolute -top-6 bg-zinc-900 text-white font-mono text-[9px] px-1.5 py-0.5 rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">9.2</div>
                                <div className="w-full bg-indigo-500 rounded-t" style={{ height: "70%" }} />
                              </div>
                              <span className="text-[8px] text-zinc-500 font-mono mt-1">Maio</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-indigo-900/10 rounded-t h-12 flex items-end justify-center relative group">
                                <div className="absolute -top-6 bg-zinc-900 text-white font-mono text-[9px] px-1.5 py-0.5 rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">10.1</div>
                                <div className="w-full bg-indigo-500 rounded-t" style={{ height: "82%" }} />
                              </div>
                              <span className="text-[8px] text-zinc-500 font-mono mt-1">Junho</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-indigo-900/10 rounded-t h-12 flex items-end justify-center relative group">
                                <div className="absolute -top-6 bg-zinc-900 text-white font-mono text-[9px] px-1.5 py-0.5 rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">{selectedVehicleEconomy}</div>
                                <div className="w-full bg-emerald-500 rounded-t animate-pulse" style={{ height: `${Math.min(selectedVehicleEconomy * 7, 100)}%` }} />
                              </div>
                              <span className="text-[8px] text-emerald-400 font-mono mt-1">Atual</span>
                            </div>
                          </div>
                        </div>

                        {/* Recent Expenses List inside Smartphone */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-zinc-400 font-mono uppercase tracking-wider">Últimos Lançamentos</span>
                            <span className="text-[9px] text-zinc-500">Histórico rápido</span>
                          </div>

                          <div className="space-y-1.5">
                            {getVehicleFuelLogs(selectedVehicleId).slice(0, 1).map(f => (
                              <div key={f.id} className="bg-zinc-900/20 border border-white/5 rounded-xl p-3 flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                  <div className="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg border border-white/5">
                                    <Droplet className="w-3.5 h-3.5" />
                                  </div>
                                  <div>
                                    <strong className="text-white block">Abastecimento</strong>
                                    <span className="text-[10px] text-zinc-500">{f.gasStation} • {f.fuelType}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-white font-bold block font-mono">-R$ {f.totalCost.toFixed(2)}</span>
                                  <span className="text-[9px] text-zinc-500 font-mono">{f.mileageAtRefuel} km</span>
                                </div>
                              </div>
                            ))}

                            {getVehicleMaintenances(selectedVehicleId).slice(0, 1).map(m => (
                              <div key={m.id} className="bg-zinc-900/20 border border-white/5 rounded-xl p-3 flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                  <div className="bg-indigo-500/10 text-indigo-400 p-1.5 rounded-lg border border-white/5">
                                    <Wrench className="w-3.5 h-3.5" />
                                  </div>
                                  <div>
                                    <strong className="text-white block">{m.type}</strong>
                                    <span className="text-[10px] text-zinc-500">Manutenção Preventiva</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-white font-bold block font-mono">-R$ {m.cost.toFixed(2)}</span>
                                  <span className="text-[9px] text-zinc-500 font-mono">{m.mileage} km</span>
                                </div>
                              </div>
                            ))}

                            {getVehicleFuelLogs(selectedVehicleId).length === 0 && getVehicleMaintenances(selectedVehicleId).length === 0 && (
                              <div className="text-center py-4 text-xs text-gray-500">
                                Nenhum lançamento registrado para este carro.
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Floating actions simulated menu trigger */}
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => setShowAddFuelModal(true)}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-950/20"
                          >
                            <Droplet className="w-3.5 h-3.5" />
                            + Abastecer
                          </button>
                          <button
                            onClick={() => setShowAddMaintModal(true)}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-950/20"
                          >
                            <Wrench className="w-3.5 h-3.5" />
                            + Manutenção
                          </button>
                        </div>
                      </div>
                    )}


                    {/* ============================================== */}
                    {/* VIEW: REFUELING LOGS */}
                    {/* ============================================== */}
                    {simView === "app_fuel_logs" && (
                      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 select-none pb-20">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">Registro de Abastecimentos</span>
                          <button
                            onClick={() => setShowAddFuelModal(true)}
                            className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer hover:bg-emerald-500"
                          >
                            <Plus className="w-3 h-3" /> Novo
                          </button>
                        </div>

                        <div className="space-y-2">
                          {getVehicleFuelLogs(selectedVehicleId).map(log => (
                            <div key={log.id} className="bg-zinc-900/20 border border-white/5 rounded-xl p-3 space-y-2.5">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-bold text-white text-xs">{log.gasStation}</h5>
                                  <span className="text-[10px] text-zinc-500">{log.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-white font-mono">R$ {log.totalCost.toFixed(2)}</span>
                                  <button
                                    onClick={() => deleteFuelLog(log.id)}
                                    className="text-zinc-500 hover:text-red-400 p-0.5 cursor-pointer transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono pt-2 border-t border-white/5 text-zinc-400">
                                <div>
                                  <span className="text-zinc-500 block text-[8px]">VOLUME</span>
                                  {log.totalLitres} Litros
                                </div>
                                <div>
                                  <span className="text-zinc-500 block text-[8px]">PREÇO / L</span>
                                  R$ {log.pricePerLiter.toFixed(2)}
                                </div>
                                <div>
                                  <span className="text-zinc-500 block text-[8px]">KM REGISTRADO</span>
                                  {log.mileageAtRefuel} Km
                                </div>
                              </div>
                            </div>
                          ))}

                          {getVehicleFuelLogs(selectedVehicleId).length === 0 && (
                            <div className="text-center py-10 text-xs text-zinc-500">
                              Nenhum abastecimento registrado. Clique em "Novo" para simular!
                            </div>
                          )}
                        </div>
                      </div>
                    )}


                    {/* ============================================== */}
                    {/* VIEW: MAINTENANCE TIMELINE */}
                    {/* ============================================== */}
                    {simView === "app_maintenances" && (
                      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 select-none pb-20">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">Linha do Tempo de Revisões</span>
                          <button
                            onClick={() => setShowAddMaintModal(true)}
                            className="bg-indigo-600 text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer hover:bg-indigo-500"
                          >
                            <Plus className="w-3 h-3" /> Novo
                          </button>
                        </div>

                        <div className="relative border-l border-white/5 pl-4 ml-2.5 space-y-4">
                          {getVehicleMaintenances(selectedVehicleId).map(maint => (
                            <div key={maint.id} className="relative space-y-1 bg-zinc-900/20 p-3 rounded-xl border border-white/5">
                              {/* Dot decorator */}
                              <div className="absolute -left-[22px] top-4 w-3.5 h-3.5 bg-indigo-500 border-2 border-[#09090B] rounded-full" />
                              
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-bold text-white text-xs">{maint.type}</h5>
                                  <span className="text-[10px] text-zinc-500">{maint.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-white font-mono">R$ {maint.cost.toFixed(2)}</span>
                                  <button
                                    onClick={() => deleteMaintLog(maint.id)}
                                    className="text-zinc-500 hover:text-red-400 p-0.5 cursor-pointer transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">{maint.notes}</p>
                              <div className="text-[9px] text-zinc-500 font-mono pt-1">
                                Realizado aos {maint.mileage} Km
                              </div>
                            </div>
                          ))}

                          {getVehicleMaintenances(selectedVehicleId).length === 0 && (
                            <div className="text-center py-10 text-xs text-zinc-500 -ml-4 border-none">
                              Nenhuma manutenção cadastrada. Clique em "Novo" para simular!
                            </div>
                          )}
                        </div>
                      </div>
                    )}


                    {/* ============================================== */}
                    {/* VIEW: ASSISTANT CHAT */}
                    {/* ============================================== */}
                    {simView === "app_assistant" && (
                      <div className="flex-1 flex flex-col min-h-0 relative">
                        
                        {/* Messages panel */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-24">
                          {chatMessages.map(msg => (
                            <div
                              key={msg.id}
                              className={`flex flex-col max-w-[85%] ${
                                msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                              }`}
                            >
                              <div
                                className={`px-3 py-2.5 rounded-2xl text-xs leading-relaxed ${
                                  msg.role === "user"
                                    ? "bg-indigo-600 text-white rounded-tr-none"
                                    : "bg-zinc-900/40 text-zinc-200 border border-white/5 rounded-tl-none"
                                }`}
                              >
                                {msg.text.split("\n").map((line, i) => {
                                  // Simple bold and bullet parser for Gemini replies
                                  let formatted = line;
                                  // Parse bold
                                  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "$1");
                                  // Parse bullet points
                                  const isBullet = line.trim().startsWith("*") || line.trim().startsWith("-");
                                  
                                  return (
                                    <span key={i} className={`block ${isBullet ? "pl-2" : ""}`}>
                                      {isBullet ? "• " + formatted.replace(/^[*-\s]+/, "") : formatted}
                                    </span>
                                  );
                                })}
                              </div>
                              <span className="text-[8px] text-zinc-500 mt-1 font-mono">{msg.timestamp}</span>
                            </div>
                          ))}

                          {isTyping && (
                            <div className="bg-zinc-900/40 border border-white/5 text-xs px-3 py-2 rounded-2xl mr-auto rounded-tl-none max-w-[85%] flex items-center gap-1.5 text-zinc-400">
                              <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" />
                              Giro AI está analisando seus dados...
                            </div>
                          )}
                          <div ref={chatBottomRef} />
                        </div>

                        {/* Interactive presets footer */}
                        <div className="absolute bottom-16 left-0 right-0 p-2 bg-[#09090B]/95 border-t border-white/5 flex flex-wrap gap-1 shrink-0 z-10 select-none">
                          <button
                            onClick={() => handleSendMessage(undefined, "Quanto já gastei este ano?")}
                            className="text-[9px] bg-zinc-900/40 hover:bg-zinc-800 text-indigo-400 border border-white/5 px-2 py-1 rounded-full cursor-pointer transition-colors"
                          >
                            Quanto gastei este ano?
                          </button>
                          <button
                            onClick={() => handleSendMessage(undefined, "Quando foi a última troca de óleo?")}
                            className="text-[9px] bg-zinc-900/40 hover:bg-zinc-800 text-indigo-400 border border-white/5 px-2 py-1 rounded-full cursor-pointer transition-colors"
                          >
                            Última troca de óleo?
                          </button>
                          <button
                            onClick={() => handleSendMessage(undefined, "Quanto meu carro faz por litro?")}
                            className="text-[9px] bg-zinc-900/40 hover:bg-zinc-800 text-indigo-400 border border-white/5 px-2 py-1 rounded-full cursor-pointer transition-colors"
                          >
                            Consumo por Litro?
                          </button>
                          <button
                            onClick={() => handleSendMessage(undefined, "O que preciso revisar agora?")}
                            className="text-[9px] bg-zinc-900/40 hover:bg-zinc-800 text-indigo-400 border border-white/5 px-2 py-1 rounded-full cursor-pointer transition-colors"
                          >
                            O que preciso revisar?
                          </button>
                        </div>

                        {/* Chat entry form */}
                        <form
                          onSubmit={handleSendMessage}
                          className="absolute bottom-0 left-0 right-0 p-2 bg-[#09090B] border-t border-white/5 flex gap-1.5 shrink-0 z-10"
                        >
                          <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Pergunte ao Giro AI sobre o carro..."
                            className="flex-1 bg-zinc-900/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white outline-none placeholder:text-zinc-600 focus:border-indigo-500"
                          />
                          <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl border border-white/5 cursor-pointer flex items-center justify-center transition-all"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    )}


                    {/* ============================================== */}
                    {/* VIEW: DASHBOARD WARNING LIGHTS SCANNER */}
                    {/* ============================================== */}
                    {simView === "app_scanner" && (
                      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 select-none pb-20 flex flex-col min-h-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-indigo-400" />
                            Scanner de Luzes do Painel
                          </span>
                          <span className="text-[9px] bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 px-2 py-0.5 rounded-full font-mono">
                            Giro Vision AI
                          </span>
                        </div>

                        {!scannerImage ? (
                          <div className="space-y-4">
                            {/* Drag / Click Upload Box */}
                            <label className="border-2 border-dashed border-zinc-800 hover:border-indigo-500/50 bg-zinc-900/20 hover:bg-indigo-950/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all gap-2 group min-h-[160px]">
                              <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const base64 = reader.result as string;
                                    handleScanDashboard(base64, null);
                                  };
                                  reader.readAsDataURL(file);
                                }}
                              />
                              <div className="bg-zinc-900 text-zinc-400 group-hover:text-indigo-400 group-hover:bg-indigo-950/40 p-3 rounded-full border border-white/5 group-hover:border-indigo-500/20 transition-all">
                                <Upload className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-xs font-semibold text-zinc-300 block">Tirar Foto do Painel</span>
                                <span className="text-[10px] text-zinc-500 block mt-1 leading-normal px-4">
                                  Use a câmera do seu celular ou envie uma imagem salva na galeria para identificar os alertas ativos.
                                </span>
                              </div>
                            </label>

                            {/* Presets Grid */}
                            <div className="space-y-2">
                              <span className="text-[9px] font-bold text-zinc-500 font-mono uppercase tracking-wider block">
                                Testar com painel de exemplo:
                              </span>
                              <div className="grid grid-cols-2 gap-2 text-left">
                                <button
                                  onClick={() =>
                                    handleScanDashboard(
                                      "data:image/png;base64,iVBOR0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                                      "oleo_injecao"
                                    )
                                  }
                                  className="bg-zinc-900/30 hover:bg-zinc-900/60 border border-white/5 rounded-xl p-2.5 text-xs cursor-pointer transition-all flex flex-col gap-1.5"
                                >
                                  <div className="flex gap-1.5 text-amber-500">
                                    <span className="text-xs">🛑🛢️</span>
                                    <span className="text-xs">⚠️⚙️</span>
                                  </div>
                                  <div>
                                    <strong className="text-white text-[10px] block font-semibold leading-tight">Crítico: Óleo e Injeção</strong>
                                    <span className="text-[9px] text-zinc-500 leading-normal block mt-0.5">Alertas severos do motor</span>
                                  </div>
                                </button>

                                <button
                                  onClick={() =>
                                    handleScanDashboard(
                                      "data:image/png;base64,iVBOR0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                                      "freio_bateria"
                                    )
                                  }
                                  className="bg-zinc-900/30 hover:bg-zinc-900/60 border border-white/5 rounded-xl p-2.5 text-xs cursor-pointer transition-all flex flex-col gap-1.5"
                                >
                                  <div className="flex gap-1.5 text-red-500">
                                    <span className="text-xs">🛑🔋</span>
                                    <span className="text-xs">🛑⚠️</span>
                                  </div>
                                  <div>
                                    <strong className="text-white text-[10px] block font-semibold leading-tight">Sistemas: Freio e Elétrico</strong>
                                    <span className="text-[9px] text-zinc-500 leading-normal block mt-0.5">Alternador e freio auxiliar</span>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4 flex flex-col min-h-0">
                            {/* Image Preview Container */}
                            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 aspect-video max-h-[160px] shrink-0">
                              {scannerPreset ? (
                                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-4">
                                  <div className="flex gap-6 mb-2 animate-pulse">
                                    {scannerPreset === "oleo_injecao" ? (
                                      <>
                                        <div className="text-red-500 text-3xl font-bold bg-red-950/20 p-2 rounded-xl border border-red-500/20">🛢️</div>
                                        <div className="text-yellow-500 text-3xl font-bold bg-yellow-950/20 p-2 rounded-xl border border-yellow-500/20">⚙️</div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="text-red-500 text-3xl font-bold bg-red-950/20 p-2 rounded-xl border border-red-500/20">🔋</div>
                                        <div className="text-red-500 text-3xl font-bold bg-red-950/20 p-2 rounded-xl border border-red-500/20">⚠</div>
                                      </>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">Painel de Testes Ativo</span>
                                </div>
                              ) : (
                                <img
                                  src={scannerImage}
                                  alt="Preview do Painel"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              )}

                              {/* Scan Overlay Effect during scan */}
                              {isScanning && (
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center">
                                  <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500/80 shadow-[0_0_15px_#6366f1] animate-bounce" />
                                  <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin mb-2" />
                                  <span className="text-[10px] text-white font-medium block animate-pulse max-w-[80%] leading-relaxed">
                                    {scanningProgressText}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Diagnostic Results Block */}
                            <div className="flex-1 overflow-y-auto min-h-0 bg-[#0c0c0e]/60 rounded-2xl border border-white/5 p-4 space-y-2.5">
                              {isScanning ? (
                                <div className="space-y-3 py-4 text-center">
                                  <div className="h-2 bg-zinc-800 rounded-full w-3/4 mx-auto animate-pulse" />
                                  <div className="h-2 bg-zinc-800 rounded-full w-5/6 mx-auto animate-pulse" />
                                  <div className="h-2 bg-zinc-800 rounded-full w-1/2 mx-auto animate-pulse" />
                                </div>
                              ) : scannerError ? (
                                <div className="p-3 bg-red-950/15 border border-red-900/40 text-red-300 text-xs rounded-xl flex items-start gap-2">
                                  <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                                  <div>
                                    <strong className="text-white font-semibold">Falha na análise</strong>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">{scannerError}</p>
                                  </div>
                                </div>
                              ) : scannerResult ? (
                                <div className="text-xs text-zinc-200">
                                  {scannerResult.split("\n").map((line, idx) => {
                                    const trimmed = line.trim();
                                    if (!trimmed) return <div key={idx} className="h-2" />;

                                    // Headings
                                    if (trimmed.startsWith("###")) {
                                      return (
                                        <h4 key={idx} className="text-[11px] font-bold text-indigo-400 mt-4 mb-2 border-b border-white/5 pb-1 uppercase tracking-wider font-mono">
                                          {trimmed.replace(/^###\s*/, "")}
                                        </h4>
                                      );
                                    }
                                    
                                    // Check if bullet point
                                    const isBullet = trimmed.startsWith("*") || trimmed.startsWith("-");
                                    let content = trimmed;
                                    if (isBullet) {
                                      content = trimmed.replace(/^[*-\s]+/, "");
                                    }

                                    // Bold replacement helper
                                    const parts = content.split(/\*\*(.*?)\*\*/g);
                                    const renderedContent = parts.map((part, i) => {
                                      if (i % 2 === 1) {
                                        return <strong key={i} className="text-white font-bold">{part}</strong>;
                                      }
                                      return part;
                                    });

                                    if (isBullet) {
                                      let badgeColor = "bg-zinc-900/60 text-zinc-400 border-white/5";
                                      if (trimmed.includes("🛑")) {
                                        badgeColor = "bg-red-500/10 text-red-300 border-red-500/20";
                                      } else if (trimmed.includes("⚠️")) {
                                        badgeColor = "bg-amber-500/10 text-amber-300 border-amber-500/20";
                                      } else if (trimmed.includes("ℹ️")) {
                                        badgeColor = "bg-indigo-500/10 text-indigo-300 border-indigo-500/20";
                                      }

                                      return (
                                        <div key={idx} className={`p-3 rounded-xl border ${badgeColor} flex items-start gap-2.5 text-[11px] leading-relaxed mb-2`}>
                                          <div className="shrink-0 mt-0.5 font-bold">
                                            {trimmed.includes("🛑") ? "🛑" : trimmed.includes("⚠️") ? "⚠️" : trimmed.includes("ℹ️") ? "ℹ️" : "•"}
                                          </div>
                                          <div className="flex-1">
                                            {renderedContent}
                                          </div>
                                        </div>
                                      );
                                    }

                                    return (
                                      <p key={idx} className="text-[11px] text-zinc-300 leading-relaxed mb-1.5">
                                        {renderedContent}
                                      </p>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="text-center py-8 text-xs text-zinc-500">
                                  Selecione ou capture uma imagem para iniciar o diagnóstico de luzes do painel.
                                </div>
                              )}
                            </div>

                            {/* Reset Button */}
                            <button
                              onClick={() => {
                                setScannerImage(null);
                                setScannerPreset(null);
                                setScannerResult(null);
                                setScannerError(null);
                              }}
                              disabled={isScanning}
                              className="w-full py-2 border border-white/5 hover:border-white/10 bg-zinc-900/40 hover:bg-zinc-900/80 text-zinc-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Capturar Outra Foto
                            </button>
                          </div>
                        )}
                      </div>
                    )}


                    {/* Simulated OS Bottom Navigation Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#09090B] border-t border-white/5 px-2 flex justify-around items-center z-20 shrink-0 select-none">
                      <button
                        onClick={() => setSimView("app_dashboard")}
                        className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                          simView === "app_dashboard" ? "text-indigo-400 font-bold" : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        <Car className="w-4 h-4" />
                        <span className="text-[9px]">Giro</span>
                      </button>
 
                      <button
                        onClick={() => setSimView("app_fuel_logs")}
                        className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                          simView === "app_fuel_logs" ? "text-indigo-400 font-bold" : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        <Droplet className="w-4 h-4" />
                        <span className="text-[9px]">Posto</span>
                      </button>

                      <button
                        onClick={() => setSimView("app_scanner")}
                        className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                          simView === "app_scanner" ? "text-indigo-400 font-bold animate-pulse" : "text-zinc-500 hover:text-indigo-300"
                        }`}
                      >
                        <Camera className="w-4 h-4" />
                        <span className="text-[9px]">Scanner</span>
                      </button>
 
                      <button
                        onClick={() => setSimView("app_maintenances")}
                        className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                          simView === "app_maintenances" ? "text-indigo-400 font-bold" : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        <Wrench className="w-4 h-4" />
                        <span className="text-[9px]">Oficina</span>
                      </button>
 
                      <button
                        onClick={() => setSimView("app_assistant")}
                        className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                          simView === "app_assistant" ? "text-indigo-400 font-bold" : "text-zinc-500 hover:text-indigo-300"
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-[9px]">Giro AI</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>


            {/* ============================================== */}
            {/* SIMULATOR DIALOGS / MODALS FOR ADDING DATA */}
            {/* ============================================== */}

            {/* ADD VEHICLE MODAL */}
            {showAddVehicleModal && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-zinc-900/95 border border-white/5 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-bold text-sm">Adicionar Carro à Garagem</h4>
                    <button
                      onClick={() => setShowAddVehicleModal(false)}
                      className="text-zinc-400 hover:text-white text-xs cursor-pointer"
                    >
                      Fechar
                    </button>
                  </div>

                  <form onSubmit={handleAddVehicle} className="space-y-3 text-xs">
                    <div>
                      <label className="text-zinc-400 block mb-1">Marca (Ex: Chevrolet, Toyota)</label>
                      <input
                        type="text"
                        required
                        value={newVehicle.brand}
                        onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                        placeholder="Ex: Toyota"
                        className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Modelo (Ex: Corolla XEi)</label>
                      <input
                        type="text"
                        required
                        value={newVehicle.model}
                        onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                        placeholder="Ex: Corolla XEi"
                        className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-zinc-400 block mb-1">Ano</label>
                        <input
                          type="number"
                          required
                          value={newVehicle.year}
                          onChange={(e) => setNewVehicle({ ...newVehicle, year: Number(e.target.value) })}
                          className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">Placa</label>
                        <input
                          type="text"
                          required
                          value={newVehicle.plate}
                          onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                          placeholder="ABC1D23"
                          className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Quilometragem Atual (Km)</label>
                      <input
                        type="number"
                        required
                        value={newVehicle.currentMileage}
                        onChange={(e) => setNewVehicle({ ...newVehicle, currentMileage: Number(e.target.value) })}
                        className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Tipo de Combustível</label>
                      <select
                        value={newVehicle.fuelType}
                        onChange={(e) => setNewVehicle({ ...newVehicle, fuelType: e.target.value })}
                        className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                      >
                        <option value="Flex" className="bg-zinc-900">Flex (Gasolina/Etanol)</option>
                        <option value="Gasolina" className="bg-zinc-900">Gasolina</option>
                        <option value="Etanol" className="bg-zinc-900">Etanol</option>
                        <option value="Diesel" className="bg-zinc-900">Diesel</option>
                        <option value="Elétrico" className="bg-zinc-900">Elétrico</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg cursor-pointer hover:bg-indigo-500 mt-2 transition-colors"
                    >
                      Persistir Carro no Drift DB
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ADD FUEL LOG MODAL */}
            {showAddFuelModal && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-zinc-900/95 border border-white/5 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-bold text-sm">Registrar Abastecimento</h4>
                    <button
                      onClick={() => setShowAddFuelModal(false)}
                      className="text-zinc-400 hover:text-white text-xs cursor-pointer"
                    >
                      Fechar
                    </button>
                  </div>

                  <form onSubmit={handleAddFuelLog} className="space-y-3 text-xs">
                    <div>
                      <label className="text-zinc-400 block mb-1">Posto de Combustível</label>
                      <input
                        type="text"
                        required
                        value={newFuelLog.gasStation}
                        onChange={(e) => setNewFuelLog({ ...newFuelLog, gasStation: e.target.value })}
                        placeholder="Ex: Posto Ipiranga"
                        className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-zinc-400 block mb-1">Preço do Litro (R$)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newFuelLog.pricePerLiter}
                          onChange={(e) => setNewFuelLog({ ...newFuelLog, pricePerLiter: Number(e.target.value) })}
                          className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">Litros</label>
                        <input
                          type="number"
                          step="0.1"
                          required
                          value={newFuelLog.totalLitres}
                          onChange={(e) => setNewFuelLog({ ...newFuelLog, totalLitres: Number(e.target.value) })}
                          className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">KM Atual no Odômetro (Mínimo: {currentVehicle.currentMileage})</label>
                      <input
                        type="number"
                        required
                        value={newFuelLog.mileageAtRefuel || currentVehicle.currentMileage + 200}
                        onChange={(e) => setNewFuelLog({ ...newFuelLog, mileageAtRefuel: Number(e.target.value) })}
                        className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                      <span className="text-[10px] text-indigo-400 uppercase block font-semibold">Valor Estimado do Abastecimento:</span>
                      <strong className="text-white text-base font-mono">
                        R$ {(newFuelLog.pricePerLiter * newFuelLog.totalLitres).toFixed(2)}
                      </strong>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 text-white font-semibold py-2 rounded-lg cursor-pointer hover:bg-emerald-500 transition-colors"
                    >
                      Salvar Abastecimento no Drift DB
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ADD MAINTENANCE MODAL */}
            {showAddMaintModal && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-zinc-900/95 border border-white/5 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-bold text-sm">Registrar Manutenção</h4>
                    <button
                      onClick={() => setShowAddMaintModal(false)}
                      className="text-zinc-400 hover:text-white text-xs cursor-pointer"
                    >
                      Fechar
                    </button>
                  </div>

                  <form onSubmit={handleAddMaint} className="space-y-3 text-xs">
                    <div>
                      <label className="text-zinc-400 block mb-1">Categoria do Reparo</label>
                      <select
                        value={newMaint.type}
                        onChange={(e) => setNewMaint({ ...newMaint, type: e.target.value })}
                        className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                      >
                        <option value="Troca de óleo" className="bg-zinc-900">Troca de óleo</option>
                        <option value="Troca de filtro" className="bg-zinc-900">Troca de filtro</option>
                        <option value="Pneu" className="bg-zinc-900">Pneu</option>
                        <option value="Bateria" className="bg-zinc-900">Bateria</option>
                        <option value="Correia" className="bg-zinc-900">Correia</option>
                        <option value="Alinhamento" className="bg-zinc-900">Alinhamento</option>
                        <option value="Balanceamento" className="bg-zinc-900">Balanceamento</option>
                        <option value="Lavagem" className="bg-zinc-900">Lavagem</option>
                        <option value="Pastilha" className="bg-zinc-900">Pastilha de Freio</option>
                        <option value="Outros" className="bg-zinc-900">Outros</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Valor do Serviço (R$)</label>
                      <input
                        type="number"
                        required
                        value={newMaint.cost || ""}
                        onChange={(e) => setNewMaint({ ...newMaint, cost: Number(e.target.value) })}
                        placeholder="0.00"
                        className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Quilometragem do Carro (Opcional, padrão: atual)</label>
                      <input
                        type="number"
                        value={newMaint.mileage || ""}
                        onChange={(e) => setNewMaint({ ...newMaint, mileage: Number(e.target.value) })}
                        placeholder={String(currentVehicle.currentMileage)}
                        className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Observações / Peças Utilizadas</label>
                      <textarea
                        value={newMaint.notes}
                        onChange={(e) => setNewMaint({ ...newMaint, notes: e.target.value })}
                        placeholder="Detalhes adicionais (Ex: Marca das pastilhas, especificação do óleo)..."
                        className="w-full bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-white outline-none h-20 resize-none focus:border-indigo-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg cursor-pointer hover:bg-indigo-500 transition-colors"
                    >
                      Gravar Manutenção no Drift DB
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Styled Footer */}
      <footer className="border-t border-white/5 bg-zinc-950/60 py-8 px-6 text-center text-xs text-zinc-500 mt-12 font-mono">
        <p>© 2026 Giro S.A. - Gestão Inteligente para Carros & Motos.</p>
        <p className="mt-1">Arquitetura de Startup planejada de ponta a ponta seguindo Clean Code, SOLID e UX Humilde.</p>
      </footer>
    </div>
  );
}
