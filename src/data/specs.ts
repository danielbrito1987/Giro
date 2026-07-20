export interface NamingSuggestion {
  name: string;
  reason: string;
}

export const namingSuggestions: NamingSuggestion[] = [
  {
    name: "Giro",
    reason: "Curto, moderno, amigável. Remete ao ato de 'dar um giro', ao odômetro girando e aos ciclos de manutenção e viagens do veículo. Estilo Linear/Notion."
  },
  {
    name: "AutoCare",
    reason: "Direto e internacional. Passa imediatamente a proposta de cuidado automático e zeloso com o veículo."
  },
  {
    name: "Motora",
    reason: "Sotaque brasileiro, forte e minimalista. Focado em quem dirige e quer simplificar a vida no trânsito."
  },
  {
    name: "CarMente",
    reason: "Trocadilho sutil com 'mente' (tranquilidade, inteligência) e 'carro'. Transmite a tranquilidade de nunca esquecer nada."
  }
];

export const retentionLoops = [
  {
    title: "Notificações Preditivas Baseadas em Rodagem",
    description: "Em vez de apenas alertas por data, o app estima a quilometragem diária média com base nos abastecimentos do usuário. Se o app calcula que o óleo vencerá em 15 dias baseado no uso real, envia um alerta proativo: 'Você está rodando bastante! Estimamos que sua próxima troca de óleo será em 10 dias'."
  },
  {
    title: "Gamificação de Conservação (Vehicle Health Score)",
    description: "Um indicador visual de 0 a 100 representativo da saúde e do valor de revenda do veículo. Manutenções preventivas em dia aumentam a nota. Isso cria o desejo psicológico de manter o score sempre verde (Estilo Duolingo/Tesla)."
  },
  {
    title: "Relatório de Eficiência Mensal por E-mail/Push",
    description: "Um resumo minimalista estilo 'Spotify Wrapped' do carro: consumo médio do mês, gasto acumulado, e quantos reais foram economizados ao abastecer no posto mais barato."
  },
  {
    title: "Backup em Nuvem Sincronizado Invisível",
    description: "Diferencial de retenção: o usuário troca de celular e resgata todos os dados de múltiplos carros instantaneamente ao fazer login, garantindo que o histórico de anos não seja perdido."
  }
];

export const monetizationTiers = {
  free: [
    "Até 2 veículos ativos",
    "Histórico de gastos de até 6 meses",
    "Cadastro básico de combustível e manutenção",
    "Alertas locais padrão (óleo, licenciamento)",
    "Anúncios nativos extremamente discretos"
  ],
  premium: [
    "Veículos ilimitados para frotas ou famílias",
    "Histórico ilimitado com gráficos avançados",
    "Inteligência Artificial (Giro AI) para diagnóstico e perguntas",
    "Exportação completa para PDF de relatórios de revenda",
    "Sincronização na Nuvem em tempo real",
    "Configuração de lembretes avançados de Seguro e CNH",
    "Zero anúncios (Experiência ultra-clean)"
  ]
};

export const seoKeywords = {
  title: "Giro: Manutenção, Abastecimento e Gastos de Carros",
  shortDescription: "O assistente inteligente para cuidar do seu carro. Controle de combustível, troca de óleo, IPVA, lembretes de manutenção e gastos de forma simples.",
  longDescription: "Esqueça as planilhas complexas ou anotações perdidas. O Giro é o aplicativo de gestão automotiva definitivo, planejado para pessoas comuns que não entendem de mecânica mas precisam cuidar bem do seu automóvel.\n\nCom uma interface moderna, minimalista inspirada no Notion e no app da Tesla, você controla a quilometragem, histórico de abastecimentos, consumo médio de combustível (Km/L) e programa alertas automáticos para trocas de óleo, filtros, seguro, IPVA e vencimento da CNH.\n\nPRINCIPAIS BENEFÍCIOS:\n- Economize combustível sabendo qual posto rende mais\n- Histórico completo de manutenções valoriza o seu carro na hora da revenda\n- Giro AI: Pergunte diretamente ao assistente virtual quanto você gastou ou quando deve revisar o carro\n- Notificações preditivas para você rodar com segurança sem preocupações.",
  tags: ["controle de gastos de carros", "troca de óleo", "consumo de combustível", "gerenciador automotivo", "lembrete de IPVA", "diário de bordo carro", "manutenção de veículos", "tabela de gastos carro"]
};

export const cleanArchitectureTree = `lib/
├── app/
│   ├── config/
│   │   ├── theme.dart          # Paleta Material 3 inspirada no app Tesla/Linear
│   │   └── routes.dart         # Navegação GoRouter estruturada
│   └── constants/
│       └── assets.dart
├── core/
│   ├── error/
│   │   └── failures.dart       # Definição genérica de falhas (Server, Cache, Local)
│   ├── database/
│   │   └── app_database.dart   # Banco de dados Drift / Isar inicializado
│   └── network/
│       └── connection_checker.dart
└── features/
    ├── vehicle/                # Feature First para veículos
    │   ├── domain/
    │   │   ├── models/
    │   │   │   └── vehicle.dart
    │   │   ├── repositories/
    │   │   │   └── vehicle_repository.dart
    │   │   └── usecases/
    │   │       ├── get_vehicles.dart
    │   │       └── add_vehicle.dart
    │   ├── data/
    │   │   ├── datasources/
    │   │   │   ├── vehicle_local_datasource.dart
    │   │   │   └── vehicle_remote_datasource.dart
    │   │   └── repositories/
    │   │       └── vehicle_repository_impl.dart
    │   └── presentation/
    │       ├── providers/
    │       │   └── vehicle_provider.dart # Estado gerenciado com Riverpod
    │       └── screens/
    │           ├── vehicle_list_screen.dart
    │           └── add_vehicle_screen.dart
    ├── refueling/              # Feature de abastecimentos
    │   ├── domain/
    │   │   ├── models/
    │   │   │   └── fuel_log.dart
    │   │   └── usecases/
    │   │       ├── get_fuel_logs.dart
    │   │       └── add_fuel_log.dart
    │   └── presentation/
    │       └── screens/
    │           └── refueling_screen.dart
    ├── maintenance/            # Feature de manutenções
    │   ├── domain/
    │   │   ├── models/
    │   │   │   └── maintenance.dart
    │   │   └── usecases/
    │   │       └── register_maintenance.dart
    │   └── presentation/
    │       └── screens/
    │           └── maintenance_screen.dart
    └── assistant/              # Assistente Inteligente IA
        ├── domain/
        │   └── repositories/
        │       └── assistant_repository.dart
        └── presentation/
            └── screens/
                └── assistant_chat_screen.dart`;

export const domainModelsCode = `// vehicle.dart
class Vehicle {
  final String id;
  final String brand;
  final String model;
  final int year;
  final String plate;
  final int currentMileage;
  final String fuelType; // Flex, Gasolina, Etanol, Diesel, Elétrico
  final DateTime purchaseDate;
  final double purchaseValue;

  Vehicle({
    required this.id,
    required this.brand,
    required this.model,
    required this.year,
    required this.plate,
    required this.currentMileage,
    required this.fuelType,
    required this.purchaseDate,
    required this.purchaseValue,
  });

  Vehicle copyWith({
    String? id,
    String? brand,
    String? model,
    int? year,
    String? plate,
    int? currentMileage,
    String? fuelType,
    DateTime? purchaseDate,
    double? purchaseValue,
  }) {
    return Vehicle(
      id: id ?? this.id,
      brand: brand ?? this.brand,
      model: model ?? this.model,
      year: year ?? this.year,
      plate: plate ?? this.plate,
      currentMileage: currentMileage ?? this.currentMileage,
      fuelType: fuelType ?? this.fuelType,
      purchaseDate: purchaseDate ?? this.purchaseDate,
      purchaseValue: purchaseValue ?? this.purchaseValue,
    );
  }
}

// maintenance.dart
class Maintenance {
  final String id;
  final String vehicleId;
  final String type; // Troca de Óleo, Filtro, Pneu, Bateria, Correia, etc.
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

// fuel_log.dart
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
}`;

export const databaseSchemaCode = `import 'package:drift/drift.dart';

@DataClassName('VehicleEntity')
class Vehicles extends Table {
  TextColumn get id => text()();
  TextColumn get brand => text().withLength(min: 1, max: 50)();
  TextColumn get model => text().withLength(min: 1, max: 50)();
  IntColumn get year => integer()();
  TextColumn get plate => text().withLength(min: 7, max: 8)();
  IntColumn get currentMileage => integer()();
  TextColumn get fuelType => text()();
  DateTimeColumn get purchaseDate => dateTime()();
  RealColumn get purchaseValue => real()();

  @override
  Set<Column> get primaryKey => {id};
}

@DataClassName('MaintenanceEntity')
class Maintenances extends Table {
  TextColumn get id => text()();
  TextColumn get vehicleId => text().references(Vehicles, #id)();
  TextColumn get type => text()();
  DateTimeColumn get date => dateTime()();
  IntColumn get mileage => integer()();
  RealColumn get cost => real()();
  TextColumn get notes => text().nullable()();

  @override
  Set<Column> get primaryKey => {id};
}

@DataClassName('FuelLogEntity')
class FuelLogs extends Table {
  TextColumn get id => text()();
  TextColumn get vehicleId => text().references(Vehicles, #id)();
  DateTimeColumn get date => dateTime()();
  TextColumn get gasStation => text()();
  TextColumn get fuelType => text()();
  RealColumn get pricePerLiter => real()();
  RealColumn get totalLitres => real()();
  RealColumn get totalCost => real()();
  IntColumn get mileageAtRefuel => integer()();

  @override
  Set<Column> get primaryKey => {id};
}`;

export const useCasesList = [
  {
    feature: "Veículos",
    cases: [
      "GetVehicles: Recupera a lista de todos os carros do usuário do banco local.",
      "AddVehicle: Valida regras de negócio (ano válido, placa Mercosul) e persiste o carro.",
      "UpdateVehicleMileage: Atualiza a quilometragem atual do veículo quando houver um abastecimento ou manutenção.",
      "DeleteVehicle: Remove o veículo e cascadeia a exclusão para abastecimentos e manutenções."
    ]
  },
  {
    feature: "Abastecimentos",
    cases: [
      "RegisterFuelLog: Adiciona um novo abastecimento. Ao persistir, calcula e atualiza automaticamente o consumo médio Km/L e o custo por quilômetro.",
      "GetFuelLogsStream: Observa em tempo real a tabela de abastecimentos ordenando por data.",
      "CalculateFuelEfficiency: Caso de uso puro que analisa os dois últimos abastecimentos consecutivos para inferir a autonomia média real."
    ]
  },
  {
    feature: "Manutenções",
    cases: [
      "RegisterMaintenanceLog: Insere uma manutenção preventiva ou corretiva, deduzindo se há alertas agendados que foram concluídos.",
      "GetMaintenanceHistory: Retorna as manutenções agrupadas por categoria para relatórios financeiros."
    ]
  },
  {
    feature: "Notificações & Lembretes",
    cases: [
      "SchedulePredictiveReminder: Analisa a média de km rodados por dia do usuário e programa notificações preditivas locais em background.",
      "CheckPendingAlerts: Dispara verificação diária de datas de licenciamento, vencimento do IPVA, Seguro e CNH."
    ]
  }
];

export const navigationBlueprints = `GoRouter Configuration Flow:

Initial State 
      │
      ▼
OnboardingScreen (Primeiro acesso: Boas-vindas, cadastro do primeiro veículo)
      │
      ├─► /onboarding (Se não houver veículo cadastrado)
      │
      ▼
/dashboard (Main Layout com BottomNavigationBar)
      │
      ├──► /vehicles (Gerenciar garagem de carros)
      │      ├──► /vehicles/add (Cadastrar marca, modelo, ano, placa, km)
      │      └──► /vehicles/detail/:id (Ficha técnica do carro)
      │
      ├──► /refueling (Histórico e registro de abastecimentos)
      │      └──► /refueling/add (Formulário: KM, litros, valor por litro)
      │
      ├──► /maintenance (Linha do tempo de reparos e revisões)
      │      └──► /maintenance/add (Formulário: tipo, valor, oficina, km)
      │
      └──► /assistant (Assistente Conversacional Giro AI)
             └──► /assistant/chat (Campo de pergunta e respostas preditivas)`;
