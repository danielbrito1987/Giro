import 'dart:math';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => GiroState(),
      child: const GiroApp(),
    ),
  );
}

class GiroApp extends StatelessWidget {
  const GiroApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Giro',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF09090B),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF6366F1), // Indigo
          secondary: Color(0xFF10B981), // Emerald
          surface: Color(0xFF18181B), // Zinc 900
          onSurface: Color(0xFFFAFAFA), // Off-white
        ),
        textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
          titleLarge: GoogleFonts.spaceGrotesk(
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
          titleMedium: GoogleFonts.spaceGrotesk(
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
      home: const MainLayoutScreen(),
    );
  }
}

// Models definition
class Vehicle {
  final String id;
  final String brand;
  final String model;
  final int year;
  final String plate;
  int currentMileage;
  final String fuelType;
  final double purchaseValue;

  Vehicle({
    required this.id,
    required this.brand,
    required this.model,
    required this.year,
    required this.plate,
    required this.currentMileage,
    required this.fuelType,
    required this.purchaseValue,
  });
}

class FuelLog {
  final String id;
  final String vehicleId;
  final DateTime date;
  final String gasStation;
  final String fuelType;
  final double pricePerLiter;
  final double totalLitres;
  final double totalCost;
  final int mileageAtRefuel;

  FuelLog({
    required this.id,
    required this.vehicleId,
    required this.date,
    required this.gasStation,
    required this.fuelType,
    required this.pricePerLiter,
    required this.totalLitres,
    required this.totalCost,
    required this.mileageAtRefuel,
  });
}

class Maintenance {
  final String id;
  final String vehicleId;
  final String type;
  final DateTime date;
  final int mileage;
  final double cost;
  final String notes;

  Maintenance({
    required this.id,
    required this.vehicleId,
    required this.type,
    required this.date,
    required this.mileage,
    required this.cost,
    required this.notes,
  });
}

class ChatMessage {
  final String text;
  final bool isUser;
  final DateTime timestamp;

  ChatMessage({
    required this.text,
    required this.isUser,
    required this.timestamp,
  });
}

// App State Management using Provider
class GiroState extends ChangeNotifier {
  final List<Vehicle> _vehicles = [
    Vehicle(
      id: 'v-1',
      brand: 'Chevrolet',
      model: 'Onix 1.0 Turbo',
      year: 2023,
      plate: 'GIR1234',
      currentMileage: 18450,
      fuelType: 'Flex',
      purchaseValue: 85000,
    ),
    Vehicle(
      id: 'v-2',
      brand: 'Honda',
      model: 'Civic Touring',
      year: 2021,
      plate: 'PRM9876',
      currentMileage: 42300,
      fuelType: 'Gasolina',
      purchaseValue: 145000,
    ),
  ];

  final List<FuelLog> _fuelLogs = [
    FuelLog(
      id: 'f-1',
      vehicleId: 'v-1',
      date: DateTime.now().subtract(const Duration(days: 18)),
      gasStation: 'Posto Ipiranga',
      fuelType: 'Gasolina',
      pricePerLiter: 5.89,
      totalLitres: 42.5,
      totalCost: 250.32,
      mileageAtRefuel: 17850,
    ),
    FuelLog(
      id: 'f-2',
      vehicleId: 'v-1',
      date: DateTime.now().subtract(const Duration(days: 5)),
      gasStation: 'Posto Shell',
      fuelType: 'Gasolina',
      pricePerLiter: 5.95,
      totalLitres: 44.0,
      totalCost: 261.80,
      mileageAtRefuel: 18450,
    ),
  ];

  final List<Maintenance> _maintenances = [
    Maintenance(
      id: 'm-1',
      vehicleId: 'v-1',
      type: 'Troca de óleo',
      date: DateTime.now().subtract(const Duration(days: 60)),
      mileage: 15200,
      cost: 320.00,
      notes: 'Óleo 5W30 Sintético e filtro de óleo originais.',
    ),
    Maintenance(
      id: 'm-2',
      vehicleId: 'v-1',
      type: 'Alinhamento & Balanceamento',
      date: DateTime.now().subtract(const Duration(days: 20)),
      mileage: 17800,
      cost: 120.00,
      notes: 'Garantia de 3 meses.',
    ),
  ];

  final List<ChatMessage> _chatMessages = [
    ChatMessage(
      text: 'Olá! Eu sou o Giro AI. Pergunte-me qualquer coisa sobre seus veículos, custos de combustível ou revisões pendentes!',
      isUser: false,
      timestamp: DateTime.now(),
    )
  ];

  String _selectedVehicleId = 'v-1';

  List<Vehicle> get vehicles => _vehicles;
  String get selectedVehicleId => _selectedVehicleId;

  Vehicle get currentVehicle {
    return _vehicles.firstWhere(
      (v) => v.id == _selectedVehicleId,
      orElse: () => _vehicles.first,
    );
  }

  List<FuelLog> get fuelLogs {
    return _fuelLogs.where((f) => f.vehicleId == _selectedVehicleId).toList()
      ..sort((a, b) => b.date.compareTo(a.date));
  }

  List<Maintenance> get maintenances {
    return _maintenances.where((m) => m.vehicleId == _selectedVehicleId).toList()
      ..sort((a, b) => b.date.compareTo(a.date));
  }

  List<ChatMessage> get chatMessages => _chatMessages;

  void selectVehicle(String id) {
    _selectedVehicleId = id;
    notifyListeners();
  }

  void addVehicle(Vehicle v) {
    _vehicles.add(v);
    notifyListeners();
  }

  void addFuelLog(FuelLog log) {
    _fuelLogs.add(log);
    // Update vehicle odometer if the new refuel is higher
    final vehicle = _vehicles.firstWhere((v) => v.id == log.vehicleId);
    if (log.mileageAtRefuel > vehicle.currentMileage) {
      vehicle.currentMileage = log.mileageAtRefuel;
    }
    notifyListeners();
  }

  void addMaintenance(Maintenance m) {
    _maintenances.add(m);
    final vehicle = _vehicles.firstWhere((v) => v.id == m.vehicleId);
    if (m.mileage > vehicle.currentMileage) {
      vehicle.currentMileage = m.mileage;
    }
    notifyListeners();
  }

  // Calculated Stats
  double get averageFuelEconomy {
    final logs = fuelLogs;
    if (logs.length < 2) return 10.5; // default estimate
    
    // Sort chronologically to calculate diffs
    final sortedLogs = List<FuelLog>.from(logs)..sort((a, b) => a.date.compareTo(b.date));
    double totalKm = 0;
    double totalLitres = 0;
    
    for (int i = 1; i < sortedLogs.length; i++) {
      final prev = sortedLogs[i - 1];
      final curr = sortedLogs[i];
      totalKm += (curr.mileageAtRefuel - prev.mileageAtRefuel);
      totalLitres += curr.totalLitres;
    }
    
    if (totalLitres == 0) return 10.5;
    return totalKm / totalLitres;
  }

  double get totalExpenses {
    double total = 0;
    for (var f in fuelLogs) {
      total += f.totalCost;
    }
    for (var m in maintenances) {
      total += m.cost;
    }
    return total;
  }

  // Smart Giro AI Chat logic
  void sendUserMessage(String text) {
    _chatMessages.add(ChatMessage(text: text, isUser: true, timestamp: DateTime.now()));
    notifyListeners();

    // Generate smart response based on keywords
    Future.delayed(const Duration(milliseconds: 1000), () {
      String responseText = "";
      final query = text.toLowerCase();
      final currencyFormatter = NumberFormat.simpleCurrency(locale: 'pt_BR');

      if (query.contains('gasto') || query.contains('custo') || query.contains('reais') || query.contains('dinheiro')) {
        responseText = "O seu veículo atual ${currentVehicle.model} possui um custo total registrado de ${currencyFormatter.format(totalExpenses)} "
            "com base nos registros do aplicativo. Desse montante, "
            "${currencyFormatter.format(fuelLogs.fold(0.0, (sum, item) => sum + item.totalCost))} foi com abastecimentos e "
            "${currencyFormatter.format(maintenances.fold(0.0, (sum, item) => sum + item.cost))} foi com manutenções preventivas.";
      } else if (query.contains('média') || query.contains('consumo') || query.contains('km/l') || query.contains('eficiência')) {
        final eco = averageFuelEconomy;
        responseText = "A média calculada para o seu ${currentVehicle.model} é de ${eco.toStringAsFixed(2)} Km/L. "
            "Esta média é baseada nos seus últimos ${fuelLogs.length} abastecimentos registrados. Continue registrando seus reabastecimentos completos para maior precisão!";
      } else if (query.contains('manutenção') || query.contains('óleo') || query.contains('revisão') || query.contains('oficina')) {
        if (maintenances.isEmpty) {
          responseText = "Não encontrei nenhum registro de manutenção recente para o seu ${currentVehicle.model}. Recomendo cadastrar a última troca de óleo para acompanhar os prazos!";
        } else {
          final lastOil = maintenances.firstWhere((m) => m.type.toLowerCase().contains('óleo'), orElse: () => maintenances.first);
          final kmSince = currentVehicle.currentMileage - lastOil.mileage;
          responseText = "Sua última manutenção registrada foi '${lastOil.type}' em ${DateFormat('dd/MM/yyyy').format(lastOil.date)} (há ${kmSince} km).\n\n"
              "Considerando que seu veículo está com ${currentVehicle.currentMileage} km, restam aproximadamente ${(10000 - kmSince).clamp(0, 10000)} km para a próxima troca recomendada (intervalo padrão de 10.000 km).";
        }
      } else if (query.contains('carro') || query.contains('veículo') || query.contains('placa')) {
        responseText = "Seu veículo ativo é um ${currentVehicle.brand} ${currentVehicle.model} (${currentVehicle.year}), Placa ${currentVehicle.plate}. "
            "Atualmente, ele está registrado com ${currentVehicle.currentMileage} km rodados.";
      } else {
        responseText = "Compreendi sua dúvida sobre o ${currentVehicle.model}! Atualmente ele está com ${currentVehicle.currentMileage} km rodados, "
            "consumindo em média ${averageFuelEconomy.toStringAsFixed(1)} Km/L e tem um custo acumulado de ${currencyFormatter.format(totalExpenses)}. "
            "Gostaria de registrar um novo abastecimento ou agendar uma revisão?";
      }

      _chatMessages.add(ChatMessage(text: responseText, isUser: false, timestamp: DateTime.now()));
      notifyListeners();
    });
  }
}

// Bottom Navigator layout switcher
class MainLayoutScreen extends StatefulWidget {
  const MainLayoutScreen({super.key});

  @override
  State<MainLayoutScreen> createState() => _MainLayoutScreenState();
}

class _MainLayoutScreenState extends State<MainLayoutScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const DashboardScreen(),
    const RefuelingScreen(),
    const MaintenanceScreen(),
    const GiroAIChatScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(child: _screens[_currentIndex]),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        type: BottomNavigationBarType.fixed,
        backgroundColor: const Color(0xFF0C0C0E),
        selectedItemColor: const Color(0xFF6366F1),
        unselectedItemColor: Colors.zinc.shade500,
        selectedFontSize: 11,
        unselectedFontSize: 11,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard_rounded, size: 22),
            label: 'Painel',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.local_gas_station_rounded, size: 22),
            label: 'Abastecer',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.build_circle_rounded, size: 22),
            label: 'Manutenção',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.psychology_rounded, size: 22),
            label: 'Giro AI',
          ),
        ],
      ),
    );
  }
}

// 1. DASHBOARD SCREEN
class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<GiroState>(context);
    final car = state.currentVehicle;
    final currencyFormatter = NumberFormat.simpleCurrency(locale: 'pt_BR');

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header / Profile Section
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Olá, Motorista!',
                    style: TextStyle(color: Colors.zinc.shade400, fontSize: 13),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Text(
                        'Garagem Giro',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(fontSize: 22),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, py: 2),
                        decoration: BoxDecoration(
                          color: Colors.indigo.shade950,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.indigo.shade700.withOpacity(0.3)),
                        ),
                        child: const Text(
                          'PRO',
                          style: TextStyle(color: Color(0xFF818CF8), fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      )
                    ],
                  ),
                ],
              ),
              // Vehicle Selector Dropdown
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                decoration: BoxDecoration(
                  color: const Color(0xFF18181B),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.white.withOpacity(0.05)),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: state.selectedVehicleId,
                    dropdownColor: const Color(0xFF18181B),
                    icon: const Icon(Icons.keyboard_arrow_down, color: Colors.indigoAccent),
                    onChanged: (val) {
                      if (val != null) state.selectVehicle(val);
                    },
                    items: state.vehicles.map((v) {
                      return DropdownMenuItem<String>(
                        value: v.id,
                        child: Text('${v.brand} ${v.model}', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                      );
                    }).toList(),
                  ),
                ),
              )
            ],
          ),
          const SizedBox(height: 24),

          // Main Highlight Card (Tesla Style)
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [const Color(0xFF1E1B4B), const Color(0xFF09090B)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Colors.indigo.shade900.withOpacity(0.4)),
              boxShadow: [
                BoxShadow(
                  color: Colors.indigo.shade950.withOpacity(0.2),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                )
              ]
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.between,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          car.model.toUpperCase(),
                          style: GoogleFonts.spaceGrotesk(fontSize: 18, fontWeight: FontWeight.bold, letterSpacing: 0.5),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          'Ano: ${car.year} | Placa: ${car.plate}',
                          style: TextStyle(color: Colors.zinc.shade400, fontSize: 12),
                        ),
                      ],
                    ),
                    const Icon(Icons.directions_car_filled_rounded, color: Color(0xFF818CF8), size: 36),
                  ],
                ),
                const SizedBox(height: 24),
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('ODÔMETRO', style: TextStyle(fontSize: 10, color: Colors.zinc, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 4),
                          Text(
                            '${car.currentMileage.toLocaleString()} km',
                            style: GoogleFonts.jetBrainsMono(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.indigo.shade300),
                          ),
                        ],
                      ),
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('MÉDIA ATUAL', style: TextStyle(fontSize: 10, color: Colors.zinc, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 4),
                          Text(
                            '${state.averageFuelEconomy.toStringAsFixed(1)} Km/L',
                            style: GoogleFonts.jetBrainsMono(fontSize: 20, fontWeight: FontWeight.bold, color: const Color(0xFF10B981)),
                          ),
                        ],
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Bento-Grid Stats
          Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFF121214),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.white.withOpacity(0.03)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Icon(Icons.monetization_on_rounded, color: Colors.amber, size: 20),
                      const SizedBox(height: 12),
                      Text('Custos Totais 2026', style: TextStyle(color: Colors.zinc.shade400, fontSize: 11)),
                      const SizedBox(height: 4),
                      Text(
                        currencyFormatter.format(state.totalExpenses),
                        style: GoogleFonts.jetBrainsMono(fontSize: 15, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFF121214),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.white.withOpacity(0.03)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Icon(Icons.health_and_safety, color: Color(0xFF10B981), size: 20),
                      const SizedBox(height: 12),
                      Text('Saúde do Veículo', style: TextStyle(color: Colors.zinc.shade400, fontSize: 11)),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          const Text(
                            '98%',
                            style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                          ),
                          const SizedBox(width: 4),
                          Text('Excelente', style: TextStyle(color: Colors.zinc.shade500, fontSize: 10)),
                        ],
                      )
                    ],
                  ),
                ),
              )
            ],
          ),
          const SizedBox(height: 24),

          // Predictive Alert Area
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF1C1917), // Soft amber/stone tint
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.amber.shade900.withOpacity(0.2)),
            ),
            child: Row(
              children: [
                const Icon(Icons.bolt, color: Colors.amber, size: 24),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Estimativa de Manutenção Giro AI',
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.amber),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Pelo seu ritmo de rodagem, sua próxima Troca de Óleo será necessária daqui a 2.300 km (aprox. 45 dias).',
                        style: TextStyle(fontSize: 11, color: Colors.zinc.shade300),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Recent Activity Headers
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Text(
                'Últimos Abastecimentos',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(fontSize: 15),
              ),
              Icon(Icons.arrow_forward_ios_rounded, size: 12, color: Colors.zinc.shade500)
            ],
          ),
          const SizedBox(height: 12),

          // Simple fuel logs loop inside Dashboard
          if (state.fuelLogs.isEmpty)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 20),
              child: Text('Nenhum abastecimento cadastrado.', style: TextStyle(color: Colors.zinc.shade600, fontSize: 12)),
            )
          else
            ...state.fuelLogs.take(2).map((log) {
              return Container(
                margin: const EdgeInsets.only(bottom: 10),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF121214),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.white.withOpacity(0.02)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.between,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.zinc.shade900,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Icon(Icons.local_gas_station_rounded, color: Colors.white70, size: 16),
                        ),
                        const SizedBox(width: 12),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(log.gasStation, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                            const SizedBox(height: 2),
                            Text(
                              '${DateFormat('dd MMM').format(log.date)} • ${log.totalLitres.toStringAsFixed(1)}L',
                              style: TextStyle(color: Colors.zinc.shade500, fontSize: 11),
                            )
                          ],
                        )
                      ],
                    ),
                    Text(
                      currencyFormatter.format(log.totalCost),
                      style: GoogleFonts.jetBrainsMono(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white),
                    )
                  ],
                ),
              );
            }),
        ],
      ),
    );
  }
}

// 2. REFUELING FORM AND LIST
class RefuelingScreen extends StatefulWidget {
  const RefuelingScreen({super.key});

  @override
  State<RefuelingScreen> createState() => _RefuelingScreenState();
}

class _RefuelingScreenState extends State<RefuelingScreen> {
  final _formKey = GlobalKey<FormState>();
  final _gasStationCtrl = TextEditingController(text: 'Posto Petrobras');
  final _priceCtrl = TextEditingController(text: '5.89');
  final _litresCtrl = TextEditingController(text: '40.0');
  final _mileageCtrl = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<GiroState>(context);
    final currencyFormatter = NumberFormat.simpleCurrency(locale: 'pt_BR');

    return Scaffold(
      appBar: AppBar(
        title: Text('Registo de Abastecimento', style: GoogleFonts.spaceGrotesk(fontSize: 16, fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF09090B),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Fuel entry Form
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: const Color(0xFF121214),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white.withOpacity(0.04)),
              ),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Registrar Novo Abastecimento', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    const SizedBox(height: 16),
                    
                    // Gas station Input
                    TextFormField(
                      controller: _gasStationCtrl,
                      decoration: _inputDecoration('Posto / Bandeira'),
                      validator: (v) => v == null || v.isEmpty ? 'Informe o posto' : null,
                    ),
                    const SizedBox(height: 12),

                    Row(
                      children: [
                        Expanded(
                          child: TextFormField(
                            controller: _priceCtrl,
                            keyboardType: TextInputType.number,
                            decoration: _inputDecoration('Preço por Litro (R\$)'),
                            validator: (v) => double.tryParse(v ?? '') == null ? 'Preço inválido' : null,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: TextFormField(
                            controller: _litresCtrl,
                            keyboardType: TextInputType.number,
                            decoration: _inputDecoration('Litros abastecidos'),
                            validator: (v) => double.tryParse(v ?? '') == null ? 'Litros inválidos' : null,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    TextFormField(
                      controller: _mileageCtrl,
                      keyboardType: TextInputType.number,
                      decoration: _inputDecoration('Odômetro Atual (km) - Mínimo: ${state.currentVehicle.currentMileage} km'),
                      validator: (v) {
                        final val = int.tryParse(v ?? '');
                        if (val == null) return 'Quilometragem inválida';
                        if (val < state.currentVehicle.currentMileage) {
                          return 'Odômetro não pode ser menor do que o atual';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 18),

                    // Submit button
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF6366F1),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            final litres = double.parse(_litresCtrl.text);
                            final price = double.parse(_priceCtrl.text);
                            final cost = litres * price;

                            state.addFuelLog(FuelLog(
                              id: 'f-${DateTime.now().millisecondsSinceEpoch}',
                              vehicleId: state.selectedVehicleId,
                              date: DateTime.now(),
                              gasStation: _gasStationCtrl.text,
                              fuelType: state.currentVehicle.fuelType == 'Flex' ? 'Gasolina' : state.currentVehicle.fuelType,
                              pricePerLiter: price,
                              totalLitres: litres,
                              totalCost: cost,
                              mileageAtRefuel: int.parse(_mileageCtrl.text),
                            ));

                            _mileageCtrl.clear();
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Abastecimento registrado: R\$ ${cost.toStringAsFixed(2)}!'),
                                backgroundColor: const Color(0xFF10B981),
                              ),
                            );
                          }
                        },
                        child: const Text('Registrar Abastecimento', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                      ),
                    )
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Timelined History
            Text('Histórico de Abastecimento', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontSize: 15)),
            const SizedBox(height: 12),

            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: state.fuelLogs.length,
              itemBuilder: (context, idx) {
                final log = state.fuelLogs[idx];
                return Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: const Color(0xFF121214),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: Colors.white.withOpacity(0.02)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(log.gasStation, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          const SizedBox(height: 4),
                          Text(
                            '${DateFormat('dd/MM/yyyy').format(log.date)} • ${log.totalLitres.toStringAsFixed(1)}L @ R\$ ${log.pricePerLiter.toStringAsFixed(2)}/L',
                            style: TextStyle(color: Colors.zinc.shade500, fontSize: 11),
                          ),
                          const SizedBox(height: 4),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, py: 1.5),
                            decoration: BoxDecoration(color: Colors.zinc.shade900, borderRadius: BorderRadius.circular(6)),
                            child: Text('${log.mileageAtRefuel.toLocaleString()} km', style: GoogleFonts.jetBrainsMono(fontSize: 10, color: Colors.indigo.shade300)),
                          )
                        ],
                      ),
                      Text(
                        currencyFormatter.format(log.totalCost),
                        style: GoogleFonts.jetBrainsMono(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.white),
                      )
                    ],
                  ),
                );
              },
            )
          ],
        ),
      ),
    );
  }

  InputDecoration _inputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      labelStyle: TextStyle(color: Colors.zinc.shade500, fontSize: 12),
      filled: true,
      fillColor: const Color(0xFF09090B),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
    );
  }
}

// 3. MAINTENANCE LOG AND LIST
class MaintenanceScreen extends StatefulWidget {
  const MaintenanceScreen({super.key});

  @override
  State<MaintenanceScreen> createState() => _MaintenanceScreenState();
}

class _MaintenanceScreenState extends State<MaintenanceScreen> {
  final _formKey = GlobalKey<FormState>();
  final _typeCtrl = TextEditingController(text: 'Troca de Óleo');
  final _costCtrl = TextEditingController(text: '350.00');
  final _notesCtrl = TextEditingController(text: 'Filtro e óleo novos');
  final _mileageCtrl = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<GiroState>(context);
    final currencyFormatter = NumberFormat.simpleCurrency(locale: 'pt_BR');

    return Scaffold(
      appBar: AppBar(
        title: Text('Histórico de Manutenções', style: GoogleFonts.spaceGrotesk(fontSize: 16, fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF09090B),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Maintenance Form Card
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: const Color(0xFF121214),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white.withOpacity(0.04)),
              ),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Registrar Manutenção Preventiva/Corretiva', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    const SizedBox(height: 16),
                    
                    TextFormField(
                      controller: _typeCtrl,
                      decoration: _inputDecoration('Tipo de Manutenção (ex: Pastilhas, Óleo)'),
                      validator: (v) => v == null || v.isEmpty ? 'Informe o tipo' : null,
                    ),
                    const SizedBox(height: 12),

                    Row(
                      children: [
                        Expanded(
                          child: TextFormField(
                            controller: _costCtrl,
                            keyboardType: TextInputType.number,
                            decoration: _inputDecoration('Custo do Serviço (R\$)'),
                            validator: (v) => double.tryParse(v ?? '') == null ? 'Custo inválido' : null,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: TextFormField(
                            controller: _mileageCtrl,
                            keyboardType: TextInputType.number,
                            decoration: _inputDecoration('Quilometragem'),
                            validator: (v) => int.tryParse(v ?? '') == null ? 'Odômetro inválido' : null,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    TextFormField(
                      controller: _notesCtrl,
                      maxLines: 2,
                      decoration: _inputDecoration('Observações adicionais (Opcional)'),
                    ),
                    const SizedBox(height: 18),

                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF6366F1),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            state.addMaintenance(Maintenance(
                              id: 'm-${DateTime.now().millisecondsSinceEpoch}',
                              vehicleId: state.selectedVehicleId,
                              type: _typeCtrl.text,
                              date: DateTime.now(),
                              mileage: int.parse(_mileageCtrl.text),
                              cost: double.parse(_costCtrl.text),
                              notes: _notesCtrl.text,
                            ));

                            _mileageCtrl.clear();
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Manutenção adicionada com sucesso!'),
                                backgroundColor: Color(0xFF10B981),
                              ),
                            );
                          }
                        },
                        child: const Text('Salvar Manutenção', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                      ),
                    )
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Maintenance list
            Text('Linha do Tempo de Serviços', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontSize: 15)),
            const SizedBox(height: 12),

            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: state.maintenances.length,
              itemBuilder: (context, idx) {
                final m = state.maintenances[idx];
                return Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: const Color(0xFF121214),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: Colors.white.withOpacity(0.02)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(m.type, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white)),
                            const SizedBox(height: 4),
                            Text(
                              '${DateFormat('dd/MM/yyyy').format(m.date)} • ${m.notes}',
                              style: TextStyle(color: Colors.zinc.shade500, fontSize: 11),
                            ),
                            const SizedBox(height: 6),
                            Container(
                              display: Alignment.centerLeft.runtimeType == null ? null : null,
                              padding: const EdgeInsets.symmetric(horizontal: 6, py: 1.5),
                              decoration: BoxDecoration(color: Colors.indigo.shade950, borderRadius: BorderRadius.circular(6)),
                              child: Text('${m.mileage.toLocaleString()} km', style: GoogleFonts.jetBrainsMono(fontSize: 10, color: const Color(0xFF818CF8), fontWeight: FontWeight.bold)),
                            )
                          ],
                        ),
                      ),
                      const SizedBox(width: 12),
                      Text(
                        currencyFormatter.format(m.cost),
                        style: GoogleFonts.jetBrainsMono(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.amber),
                      )
                    ],
                  ),
                );
              },
            )
          ],
        ),
      ),
    );
  }

  InputDecoration _inputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      labelStyle: TextStyle(color: Colors.zinc.shade500, fontSize: 12),
      filled: true,
      fillColor: const Color(0xFF09090B),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
    );
  }
}

// 4. GIRO AI CHAT CHANNELS
class GiroAIChatScreen extends StatefulWidget {
  const GiroAIChatScreen({super.key});

  @override
  State<GiroAIChatScreen> createState() => _GiroAIChatScreenState();
}

class _GiroAIChatScreenState extends State<GiroAIChatScreen> {
  final _inputCtrl = TextEditingController();
  final _scrollController = ScrollController();

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<GiroState>(context);
    
    return Column(
      children: [
        // Chat Header
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          border: Border(bottom: BorderSide(color: Colors.white.withOpacity(0.05))),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.indigo.shade950,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.psychology_rounded, color: Color(0xFF818CF8), size: 20),
              ),
              const SizedBox(width: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Giro AI Copilot', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  Text('Assistente preditivo inteligente', style: TextStyle(color: Colors.zinc.shade500, fontSize: 11)),
                ],
              ),
            ],
          ),
        ),

        // Chat History List
        Expanded(
          child: ListView.builder(
            controller: _scrollController,
            padding: const EdgeInsets.all(18),
            itemCount: state.chatMessages.length,
            itemBuilder: (context, idx) {
              final msg = state.chatMessages[idx];
              return Align(
                alignment: msg.isUser ? Alignment.centerRight : Alignment.centerLeft,
                child: Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(14),
                  maxWidth: MediaQuery.of(context).size.width * 0.75,
                  decoration: BoxDecoration(
                    color: msg.isUser ? const Color(0xFF4338CA) : const Color(0xFF18181B),
                    borderRadius: BorderRadius.only(
                      topLeft: const Radius.circular(16),
                      topRight: const Radius.circular(16),
                      bottomLeft: Radius.circular(msg.isUser ? 16 : 4),
                      bottomRight: Radius.circular(msg.isUser ? 4 : 16),
                    ),
                    border: Border.all(color: msg.isUser ? Colors.indigoAccent.withOpacity(0.3) : Colors.white.withOpacity(0.03)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        msg.text,
                        style: TextStyle(fontSize: 13, color: msg.isUser ? Colors.white : Colors.zinc.shade200, height: 1.4),
                      ),
                      const SizedBox(height: 4),
                      Align(
                        alignment: Alignment.bottomRight,
                        child: Text(
                          DateFormat('HH:mm').format(msg.timestamp),
                          style: TextStyle(color: msg.isUser ? Colors.white38 : Colors.zinc.shade600, fontSize: 9),
                        ),
                      )
                    ],
                  ),
                ),
              );
            },
          ),
        ),

        // Pre-defined Quick Queries helper
        Container(
          height: 36,
          margin: const EdgeInsets.only(bottom: 8),
          child: ListView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 14),
            children: [
              _quickButton('Quanto gastei no total?', state),
              _quickButton('Qual a média de consumo?', state),
              _quickButton('Quando trocar o óleo?', state),
            ],
          ),
        ),

        // Input Box Form
        Container(
          padding: const EdgeInsets.all(14),
          border: Border(top: BorderSide(color: Colors.white.withOpacity(0.05))),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _inputCtrl,
                  style: const TextStyle(fontSize: 13),
                  decoration: InputDecoration(
                    hintText: 'Pergunte sobre seus custos ou consumo...',
                    hintStyle: TextStyle(color: Colors.zinc.shade500, fontSize: 13),
                    filled: true,
                    fillColor: const Color(0xFF121214),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  ),
                  onSubmitted: (v) {
                    if (v.trim().isNotEmpty) {
                      state.sendUserMessage(v.trim());
                      _inputCtrl.clear();
                      _scrollToBottom();
                    }
                  },
                ),
              ),
              const SizedBox(width: 10),
              CircleAvatar(
                backgroundColor: const Color(0xFF6366F1),
                radius: 20,
                child: IconButton(
                  icon: const Icon(Icons.send, color: Colors.white, size: 16),
                  onPressed: () {
                    final text = _inputCtrl.text.trim();
                    if (text.isNotEmpty) {
                      state.sendUserMessage(text);
                      _inputCtrl.clear();
                      _scrollToBottom();
                    }
                  },
                ),
              )
            ],
          ),
        ),
      ],
    );
  }

  Widget _quickButton(String text, GiroState state) {
    return GestureDetector(
      onTap: () {
        state.sendUserMessage(text);
        _scrollToBottom();
      },
      child: Container(
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: const Color(0xFF18181B),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: Colors.white.withOpacity(0.05)),
        ),
        child: Center(child: Text(text, style: const TextStyle(color: Colors.indigoAccent, fontSize: 11, fontWeight: FontWeight.bold))),
      ),
    );
  }
}

// Utility extension for elegant formatting
extension IntFormatting on int {
  String toLocaleString() {
    return toString().replaceAllRegExp(RegExp(r'\B(?=(\d{3})+(?!\d))'), '.');
  }
}

extension RegExpExtension on String {
  String replaceAllRegExp(RegExp exp, String replaceWith) {
    return replaceAll(exp, replaceWith);
  }
}
