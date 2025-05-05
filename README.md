# 🚴‍♀️ Meu Pedal

**Meu Pedal** é um app mobile simples e offline feito com React Native para ciclistas que desejam registrar seus treinos e acompanhar sua evolução. A proposta é ser leve, acessível e útil no dia a dia.

## 📱 Funcionalidades
- Adicionar treinos com data, distância, tempo e observações
- Listagem de treinos ordenados por data
- Edição e exclusão de treinos
- Total de quilômetros pedalados
- Armazenamento local com AsyncStorage
- Interface responsiva com modo escuro
- Explorar eventos de ciclismo acontecendo em toda a América Latina

## 🛠️ Tecnologias
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Styled-components](https://styled-components.com/)
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)

## 📸 Screenshots
| Tela Inicial | Explorar Eventos | Novo Treino |
|--------------|------------------|-------------|
| <img src="docs/screenshots/home.png" width="200"> | <img src="docs/screenshots/explore.png" width="200"> | <img src="docs/screenshots/new-training.png" width="200"> |

## 🚀 Como rodar
```bash
git clone 
cd meu-pedal
npm install
npx expo start