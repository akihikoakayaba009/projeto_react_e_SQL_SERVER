import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { PDFViewer, Page, Text as PDFText, Document, StyleSheet as PDFStyleSheet } from '@react-pdf/renderer';

const generatePDFContent = (data) => (
  <Document>
    <Page size="A4">
      <View style={styles.pdfContent}>
        {data.map((item) => (
          <View key={item.CLI_Codigo} style={styles.row}>
            <PDFText>ID: {item.CLI_Codigo}</PDFText>
            <PDFText>Cliente: {item.CLI_Nome}</PDFText>
            <PDFText>Endereço: {item.CLI_Endereco1}</PDFText>
            <PDFText>Endereço2 : {item.CLI_Endereco2}</PDFText>
            <PDFText>Cidade: {item.CLI_Cidade}</PDFText>
            <PDFText>Código Postal: {item.CLI_CodigoPostal}</PDFText>
            <PDFText>Localidade: {item.CLI_Localidade}</PDFText>
            <PDFText>País: {item.CLI_Pais}</PDFText>
            <PDFText>NIF: {item.CLI_NIF}</PDFText>
            <PDFText>Telefone: {item.CLI_Telefone}</PDFText>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
