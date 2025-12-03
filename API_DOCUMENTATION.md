# Documentation API - Reats Cookers

**Version:** 1.0.0  
**Date:** Décembre 2025  

---

## Table des matières

1. [Introduction](#introduction)
2. [Architecture Générale](#architecture-générale)
3. [Authentification](#authentification)
4. [Endpoints par Module](#endpoints-par-module)
   - [Auth & Onboarding](#1-auth--onboarding)
   - [Documents & Vérification](#2-documents--vérification)
   - [Dashboard](#3-dashboard)
   - [Commandes (Orders)](#4-commandes-orders)
   - [Menu](#5-menu)
   - [Analytics](#6-analytics)
   - [Compte Utilisateur](#7-compte-utilisateur)
5. [Modèles de Données](#modèles-de-données)
6. [Codes d'Erreur](#codes-derreur)
7. [Webhooks & Notifications](#webhooks--notifications)

---

## Introduction

Cette documentation décrit l'ensemble des endpoints API nécessaires pour l'application mobile **Reats Cookers** - une plateforme de gestion pour cuisiniers professionnels.

### Base URL
```
Production: https://api.reats-cookers.com/v1
Staging: https://staging-api.reats-cookers.com/v1
```

### Format des Données
- **Request:** JSON (Content-Type: application/json)
- **Response:** JSON
- **Encodage:** UTF-8
- **Date Format:** ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)

---

## Architecture Générale

### Headers Requis
```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {access_token}
```

### Structure de Réponse Standard

#### Succès
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2025-12-01T10:30:00.000Z"
}
```

#### Erreur
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Description de l'erreur",
    "details": { ... }
  },
  "timestamp": "2025-12-01T10:30:00.000Z"
}
```

---

## Authentification

### Token JWT
- **Type:** Bearer Token
- **Durée de vie:** 24 heures
- **Refresh Token:** 7 jours

---

## Endpoints par Module

## 1. Auth & Onboarding

### 1.1 Connexion par Téléphone

**Endpoint:** `POST /auth/login`

**Description:** Initie la connexion avec un numéro de téléphone. Envoie un code OTP par SMS.

**Request Body:**
```json
{
  "phone": "+33753790506",
  "countryCode": "FR",
  "callingCode": "+33"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "sessionId": "sess_abc123xyz",
    "phoneNumber": "+33753790506",
    "otpSentAt": "2025-12-01T10:30:00.000Z",
    "expiresIn": 300
  },
  "message": "OTP sent successfully"
}
```

---

### 1.2 Inscription

**Endpoint:** `POST /auth/register`

**Description:** Crée un nouveau compte cuisinier.

**Request Body:**
```json
{
  "firstName": "Dave",
  "lastName": "Glad",
  "phone": "+33753790506",
  "countryCode": "FR",
  "callingCode": "+33",
  "siret": "12345678901234",
  "city": "Paris",
  "interventionZones": ["Paris", "Île-de-France"]
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "userId": "user_123abc",
    "sessionId": "sess_xyz789",
    "phoneNumber": "+33753790506",
    "otpSentAt": "2025-12-01T10:30:00.000Z",
    "expiresIn": 300
  },
  "message": "Registration initiated. Please verify OTP."
}
```

---

### 1.3 Vérification OTP

**Endpoint:** `POST /auth/verify-otp`

**Description:** Vérifie le code OTP et authentifie l'utilisateur.

**Request Body:**
```json
{
  "sessionId": "sess_abc123xyz",
  "otp": "123456"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_xyz",
    "expiresIn": 86400,
    "user": {
      "id": "user_123abc",
      "firstName": "Dave",
      "lastName": "Glad",
      "phone": "+33753790506",
      "email": null,
      "isVerified": false,
      "profileComplete": false,
      "documentsStatus": "pending"
    }
  },
  "message": "Authentication successful"
}
```

---

### 1.4 Rafraîchir le Token

**Endpoint:** `POST /auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "refresh_token_xyz"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "accessToken": "new_access_token",
    "expiresIn": 86400
  }
}
```

---

### 1.5 Renvoyer OTP

**Endpoint:** `POST /auth/resend-otp`

**Request Body:**
```json
{
  "sessionId": "sess_abc123xyz"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "otpSentAt": "2024-12-01T10:35:00.000Z",
    "expiresIn": 300
  },
  "message": "OTP resent successfully"
}
```

---

## 2. Documents & Vérification

### 2.1 Obtenir le Statut des Documents

**Endpoint:** `GET /user/documents/status`

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "overallStatus": "pending",
    "documents": [
      {
        "type": "identity",
        "name": "Carte d'identité ou Passeport",
        "status": "pending",
        "required": true,
        "uploadedAt": null
      },
      {
        "type": "hygiene_certificate",
        "name": "Certificat d'hygiène alimentaire",
        "status": "approved",
        "required": true,
        "uploadedAt": "2024-11-28T14:20:00.000Z",
        "approvedAt": "2024-11-29T09:15:00.000Z"
      },
      {
        "type": "insurance",
        "name": "Attestation d'assurance professionnelle",
        "status": "pending",
        "required": true,
        "uploadedAt": null
      },
      {
        "type": "siret",
        "name": "Extrait KBIS ou SIRET",
        "status": "pending",
        "required": true,
        "uploadedAt": null
      },
      {
        "type": "bank_details",
        "name": "Coordonnées bancaires (RIB)",
        "status": "incomplete",
        "required": true,
        "uploadedAt": null
      }
    ],
    "completionPercentage": 20
  }
}
```

---

### 2.2 Upload Document

**Endpoint:** `POST /user/documents/upload`

**Headers:** 
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
documentType: "hygiene_certificate"
frontImage: [File]
backImage: [File] (optionnel)
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "documentId": "doc_abc123",
    "type": "hygiene_certificate",
    "status": "pending",
    "uploadedAt": "2025-12-01T10:30:00.000Z",
    "files": [
      {
        "id": "file_front_123",
        "url": "https://cdn.reats-cookers.com/documents/...",
        "side": "front"
      },
      {
        "id": "file_back_456",
        "url": "https://cdn.reats-cookers.com/documents/...",
        "side": "back"
      }
    ]
  },
  "message": "Document uploaded successfully"
}
```

---

### 2.3 Soumettre le Dossier pour Vérification

**Endpoint:** `POST /user/documents/submit`

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "submittedAt": "2025-12-01T10:30:00.000Z",
    "status": "under_review",
    "estimatedReviewTime": "24-48 hours"
  },
  "message": "Documents submitted for review"
}
```

---

## 3. Dashboard

### 3.1 Obtenir les Statistiques du Dashboard

**Endpoint:** `GET /dashboard/stats`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `period` (optional): `today` | `week` | `month` | `year` (default: `today`)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "period": "today",
    "stats": {
      "activeOrders": {
        "count": 20,
        "trend": "+12%"
      },
      "pendingOrders": {
        "count": 5,
        "trend": null
      },
      "todayRevenue": {
        "amount": 2241.50,
        "currency": "EUR",
        "trend": "+8%"
      },
      "customersServed": {
        "count": 142,
        "trend": null
      }
    },
    "revenueChart": {
      "labels": ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      "data": [1200, 1500, 1800, 2100, 2400, 2800, 2241]
    },
    "recentReviews": [
      {
        "id": "review_123",
        "customerName": "Marie Dupont",
        "rating": 5,
        "comment": "Excellent service!",
        "date": "2024-12-01T09:30:00.000Z",
        "orderNumber": "#1234"
      }
    ],
    "popularItems": [
      {
        "id": "item_1",
        "name": "Burger Signature",
        "soldToday": 23,
        "revenue": 434.70,
        "image": "https://cdn.reats-cookers.com/items/..."
      }
    ]
  }
}
```

---

### 3.2 Actions Rapides

**Endpoint:** `GET /dashboard/quick-actions`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "actions": [
      {
        "id": "new_order",
        "label": "Nouvelle commande",
        "icon": "shopping-bag",
        "count": 5,
        "priority": "high"
      },
      {
        "id": "low_stock",
        "label": "Stock faible",
        "icon": "alert-circle",
        "count": 3,
        "priority": "medium"
      }
    ]
  }
}
```

---

## 4. Commandes (Orders)

### 4.1 Liste des Commandes

**Endpoint:** `GET /orders`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `status` (optional): `pending` | `preparing` | `ready` | `completed` | `cancelled`
- `page` (optional): numéro de page (default: 1)
- `limit` (optional): nombre d'éléments par page (default: 20)
- `sortBy` (optional): `date` | `amount` (default: `date`)
- `sortOrder` (optional): `asc` | `desc` (default: `desc`)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order_123",
        "orderNumber": "#1234",
        "customerName": "John Doe",
        "customerPhone": "+33612345678",
        "items": [
          {
            "id": "item_1",
            "name": "Burger Signature",
            "quantity": 2,
            "price": 18.90,
            "total": 37.80,
            "image": "https://cdn.reats-cookers.com/items/..."
          }
        ],
        "itemsCount": 4,
        "subtotal": 45.00,
        "tax": 4.50,
        "deliveryFee": 2.02,
        "total": 51.52,
        "status": "preparing",
        "orderTime": "2024-12-01T10:00:00.000Z",
        "estimatedTime": "10 min",
        "paymentMethod": "card",
        "deliveryType": "pickup"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 98,
      "itemsPerPage": 20
    },
    "summary": {
      "activeOrders": 12,
      "todayRevenue": 342.00
    }
  }
}
```

---

### 4.2 Détails d'une Commande

**Endpoint:** `GET /orders/:orderId`

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "order_123",
    "orderNumber": "#1234",
    "status": "preparing",
    "orderTime": "2024-12-01T10:00:00.000Z",
    "estimatedTime": "10 min",
    "customer": {
      "id": "customer_456",
      "name": "John Doe",
      "phone": "+33612345678",
      "email": "john.doe@example.com",
      "address": "123 Rue de la Paix, 75001 Paris"
    },
    "items": [
      {
        "id": "item_1",
        "menuItemId": "menu_item_1",
        "name": "Burger Signature",
        "quantity": 2,
        "unitPrice": 18.90,
        "total": 37.80,
        "image": "https://cdn.reats-cookers.com/items/...",
        "customizations": [
          {
            "name": "Sans oignon",
            "price": 0
          }
        ]
      }
    ],
    "pricing": {
      "subtotal": 45.00,
      "tax": 4.50,
      "taxRate": 10,
      "deliveryFee": 2.02,
      "total": 51.52,
      "currency": "EUR"
    },
    "payment": {
      "method": "card",
      "status": "paid",
      "transactionId": "txn_abc123",
      "paidAt": "2024-12-01T10:00:00.000Z"
    },
    "delivery": {
      "type": "pickup",
      "address": null,
      "instructions": null
    },
    "notes": "Merci de bien cuire le burger",
    "timeline": [
      {
        "status": "pending",
        "timestamp": "2024-12-01T10:00:00.000Z"
      },
      {
        "status": "preparing",
        "timestamp": "2024-12-01T10:05:00.000Z"
      }
    ],
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:05:00.000Z"
  }
}
```

---

### 4.3 Changer le Statut d'une Commande

**Endpoint:** `PATCH /orders/:orderId/status`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "status": "ready",
  "notes": "Commande prête pour récupération"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "orderId": "order_123",
    "previousStatus": "preparing",
    "newStatus": "ready",
    "updatedAt": "2024-12-01T10:15:00.000Z"
  },
  "message": "Order status updated successfully"
}
```

---

## 5. Menu

### 5.1 Liste des Articles du Menu

**Endpoint:** `GET /menu/items`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `category` (optional): `burgers` | `pizza` | `salads` | `desserts` | `drinks`
- `available` (optional): `true` | `false`
- `search` (optional): recherche par nom ou SKU
- `page` (optional): numéro de page
- `limit` (optional): éléments par page

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "item_1",
        "name": "Burger Signature",
        "description": "Bœuf premium, sauce maison",
        "price": 18.90,
        "cost": 6.30,
        "margin": 66.67,
        "category": "burgers",
        "sku": "BRG-001",
        "image": "https://images.unsplash.com/photo-1568901346375...",
        "available": true,
        "featured": true,
        "preparationTime": 15,
        "maxConcurrentOrders": 10,
        "currentOrders": 3,
        "allergens": ["gluten", "lactose", "eggs"],
        "ingredients": ["beef", "bun", "lettuce", "tomato", "cheese"],
        "stats": {
          "soldToday": 23,
          "revenueToday": 434.70,
          "averageRating": 4.8,
          "totalReviews": 156
        },
        "createdAt": "2024-11-01T10:00:00.000Z",
        "updatedAt": "2024-12-01T09:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 24,
      "itemsPerPage": 10
    },
    "summary": {
      "totalItems": 24,
      "availableItems": 20,
      "lowStockItems": 3,
      "totalRevenue": 1466.50,
      "ordersToday": 70
    }
  }
}
```

---

### 5.2 Détails d'un Article

**Endpoint:** `GET /menu/items/:itemId`

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "item_1",
    "name": "Burger Signature",
    "description": "Bœuf premium, sauce maison, légumes frais",
    "price": 18.90,
    "cost": 6.30,
    "margin": 66.67,
    "category": "burgers",
    "sku": "BRG-001",
    "images": [
      {
        "id": "img_1",
        "url": "https://cdn.reats-cookers.com/items/...",
        "isPrimary": true
      }
    ],
    "available": true,
    "featured": true,
    "preparationTime": 15,
    "maxConcurrentOrders": 10,
    "currentOrders": 3,
    "allergens": [
      {
        "id": "gluten",
        "name": "Gluten (céréales)"
      }
    ],
    "ingredients": [
      {
        "id": "beef",
        "name": "Bœuf",
        "category": "protein"
      }
    ],
    "nutritionalInfo": {
      "calories": 650,
      "protein": 35,
      "carbs": 45,
      "fat": 28
    },
    "stats": {
      "soldToday": 23,
      "soldThisWeek": 156,
      "soldThisMonth": 678,
      "revenueToday": 434.70,
      "revenueThisWeek": 2948.40,
      "revenueThisMonth": 12814.20,
      "averageRating": 4.8,
      "totalReviews": 156
    },
    "createdAt": "2024-11-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T09:00:00.000Z"
  }
}
```

---

### 5.3 Créer un Article

**Endpoint:** `POST /menu/items`

**Headers:** 
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
name: "Burger Végétarien"
description: "Galette de légumes, avocat, fromage"
price: 16.50
cost: 5.20
category: "burgers"
sku: "BRG-002"
preparationTime: 12
maxConcurrentOrders: 12
available: true
featured: false
deliveryType: "pickup"
ingredients: ["veggie_patty", "avocado", "cheese", "lettuce"]
allergens: ["gluten", "milk", "soy"]
photos: [File, File]
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "item_new_123",
    "name": "Burger Végétarien",
    "sku": "BRG-002",
    "price": 16.50,
    "available": true,
    "createdAt": "2025-12-01T10:30:00.000Z"
  },
  "message": "Menu item created successfully"
}
```

---

### 5.4 Modifier un Article

**Endpoint:** `PATCH /menu/items/:itemId`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "name": "Burger Signature Premium",
  "price": 19.90,
  "available": true
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "item_1",
    "updatedFields": ["name", "price", "available"],
    "updatedAt": "2025-12-01T10:30:00.000Z"
  },
  "message": "Menu item updated successfully"
}
```

---

### 5.5 Supprimer un Article

**Endpoint:** `DELETE /menu/items/:itemId`

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "item_1",
    "deletedAt": "2025-12-01T10:30:00.000Z"
  },
  "message": "Menu item deleted successfully"
}
```

---

### 5.6 Basculer la Disponibilité

**Endpoint:** `PATCH /menu/items/:itemId/availability`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "available": false
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "item_1",
    "available": false,
    "updatedAt": "2025-12-01T10:30:00.000Z"
  },
  "message": "Availability updated"
}
```

---

### 5.7 Obtenir les Ingrédients

**Endpoint:** `GET /menu/ingredients`

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "ingredients": [
      {
        "id": "beef",
        "name": "Bœuf",
        "category": "protein",
        "allergens": []
      },
      {
        "id": "cheese",
        "name": "Fromage",
        "category": "dairy",
        "allergens": ["milk"]
      }
    ],
    "categories": [
      {
        "id": "protein",
        "name": "Protéines",
        "count": 15
      }
    ]
  }
}
```

---

## 6. Analytics

### 6.1 Statistiques Générales

**Endpoint:** `GET /analytics/overview`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `period`: `today` | `week` | `month` | `year`
- `startDate` (optional): ISO 8601 date
- `endDate` (optional): ISO 8601 date

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "period": "month",
    "revenue": {
      "total": 12450.00,
      "change": "+18%",
      "chartData": {
        "labels": ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
        "values": [2800, 3100, 3200, 3350]
      }
    },
    "orders": {
      "total": 384,
      "change": "+12%",
      "averageValue": 32.42,
      "averagePreparationTime": 18
    },
    "customers": {
      "total": 1248,
      "new": 156,
      "returning": 1092,
      "repeatRate": 68
    },
    "topItems": [
      {
        "id": "item_1",
        "name": "Classic Burger",
        "orders": 156,
        "revenue": 2016.00
      }
    ]
  }
}
```

---

### 6.2 Rapport des Ventes

**Endpoint:** `GET /analytics/sales`

**Query Parameters:**
- `period`: `today` | `week` | `month` | `year`
- `groupBy`: `hour` | `day` | `week` | `month`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "period": "week",
    "totalRevenue": 3450.00,
    "totalOrders": 98,
    "averageOrderValue": 35.20,
    "breakdown": [
      {
        "date": "2024-11-25",
        "revenue": 450.00,
        "orders": 12,
        "averageValue": 37.50
      }
    ]
  }
}
```

---

## 7. Compte Utilisateur

### 7.1 Profil Utilisateur

**Endpoint:** `GET /user/profile`

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "Ronald",
    "lastName": "Richards",
    "email": "ronaldrichards@example.com",
    "phone": "+33612345678",
    "avatar": "https://cdn.reats-cookers.com/avatars/...",
    "address": {
      "street": "123 Restaurant Street",
      "city": "Paris",
      "postalCode": "75001",
      "country": "France"
    },
    "businessInfo": {
      "siret": "12345678901234",
      "businessName": "Chez Ronald",
      "interventionZones": ["Paris", "Île-de-France"]
    },
    "stats": {
      "totalOrders": 248,
      "rating": 4.8,
      "totalReviews": 156,
      "joinedDate": "2024-01-15T10:00:00.000Z"
    },
    "verification": {
      "isVerified": true,
      "documentsStatus": "approved",
      "verifiedAt": "2024-01-20T14:30:00.000Z"
    },
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-12-01T09:00:00.000Z"
  }
}
```

---

### 7.2 Modifier le Profil

**Endpoint:** `PATCH /user/profile`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "firstName": "Ronald",
  "lastName": "Richards",
  "email": "newemail@example.com",
  "address": {
    "street": "456 New Street",
    "city": "Lyon",
    "postalCode": "69001",
    "country": "France"
  }
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "updatedFields": ["email", "address"],
    "updatedAt": "2025-12-01T10:30:00.000Z"
  },
  "message": "Profile updated successfully"
}
```

---

### 7.3 Changer l'Avatar

**Endpoint:** `POST /user/profile/avatar`

**Headers:** 
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body:**
```
avatar: [File]
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "avatarUrl": "https://cdn.reats-cookers.com/avatars/user_123_new.jpg",
    "updatedAt": "2025-12-01T10:30:00.000Z"
  },
  "message": "Avatar updated successfully"
}
```

---

### 7.4 Historique des Retraits

**Endpoint:** `GET /user/withdrawals`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `status` (optional): `completed` | `pending` | `failed`
- `page` (optional): numéro de page
- `limit` (optional): éléments par page

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "withdrawals": [
      {
        "id": "withdrawal_1",
        "amount": 1250.00,
        "currency": "EUR",
        "status": "completed",
        "method": "bank_transfer",
        "reference": "WD-2025-001",
        "requestedAt": "2024-10-10T10:00:00.000Z",
        "completedAt": "2024-10-15T14:30:00.000Z",
        "bankDetails": {
          "iban": "FR76****1234",
          "bic": "BNPAFRPP"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25
    },
    "summary": {
      "totalWithdrawn": 4450.00,
      "pendingAmount": 2100.00,
      "availableBalance": 3250.00
    }
  }
}
```

---

### 7.5 Demander un Retrait

**Endpoint:** `POST /user/withdrawals`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "amount": 1500.00,
  "method": "bank_transfer",
  "bankAccountId": "bank_acc_123"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "withdrawal_new_123",
    "amount": 1500.00,
    "status": "pending",
    "reference": "WD-2025-006",
    "estimatedCompletionDate": "2024-12-05T00:00:00.000Z",
    "requestedAt": "2025-12-01T10:30:00.000Z"
  },
  "message": "Withdrawal request submitted"
}
```

---

### 7.6 Avis Utilisateur

**Endpoint:** `GET /user/reviews`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `page` (optional)
- `limit` (optional)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "review_123",
        "orderId": "order_456",
        "orderNumber": "#1234",
        "customerName": "Marie Dupont",
        "rating": 5,
        "comment": "Excellent service, plats délicieux!",
        "date": "2024-12-01T09:30:00.000Z",
        "response": null
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 98
    },
    "summary": {
      "averageRating": 4.8,
      "totalReviews": 156,
      "ratingDistribution": {
        "5": 120,
        "4": 25,
        "3": 8,
        "2": 2,
        "1": 1
      }
    }
  }
}
```

---

### 7.7 Paramètres de Notification

**Endpoint:** `GET /user/settings/notifications`

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "pushNotifications": {
      "enabled": true,
      "newOrders": true,
      "orderUpdates": true,
      "promotions": false
    },
    "emailNotifications": {
      "enabled": true,
      "weeklyReport": true,
      "monthlyReport": true,
      "systemUpdates": true
    },
    "smsNotifications": {
      "enabled": false,
      "urgentOrders": false
    }
  }
}
```

---

### 7.8 Modifier les Paramètres

**Endpoint:** `PATCH /user/settings/notifications`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "pushNotifications": {
    "newOrders": true,
    "promotions": false
  }
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "updatedAt": "2025-12-01T10:30:00.000Z"
  },
  "message": "Settings updated successfully"
}
```

---

### 7.9 Supprimer le Compte

**Endpoint:** `DELETE /user/account`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "password": "user_password",
  "reason": "No longer needed"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "deletedAt": "2025-12-01T10:30:00.000Z",
    "dataRetentionPeriod": "30 days"
  },
  "message": "Account deletion initiated"
}
```

---

## Modèles de Données

### User
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  avatar: string | null;
  address: Address;
  businessInfo: BusinessInfo;
  isVerified: boolean;
  documentsStatus: "pending" | "under_review" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}
```

### Order
```typescript
{
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  pricing: OrderPricing;
  payment: PaymentInfo;
  delivery: DeliveryInfo;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### MenuItem
```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  category: string;
  sku: string;
  images: Image[];
  available: boolean;
  featured: boolean;
  preparationTime: number;
  maxConcurrentOrders: number;
  allergens: string[];
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}
```

---

## Codes d'Erreur

| Code | Message | Description |
|------|---------|-------------|
| `AUTH_001` | Invalid credentials | Identifiants incorrects |
| `AUTH_002` | Token expired | Token expiré |
| `AUTH_003` | Invalid OTP | Code OTP invalide |
| `AUTH_004` | OTP expired | Code OTP expiré |
| `USER_001` | User not found | Utilisateur introuvable |
| `USER_002` | User already exists | Utilisateur déjà existant |
| `USER_003` | Profile incomplete | Profil incomplet |
| `DOC_001` | Document upload failed | Échec du téléchargement |
| `DOC_002` | Invalid document type | Type de document invalide |
| `DOC_003` | Document too large | Document trop volumineux |
| `ORDER_001` | Order not found | Commande introuvable |
| `ORDER_002` | Invalid status transition | Transition de statut invalide |
| `MENU_001` | Item not found | Article introuvable |
| `MENU_002` | SKU already exists | SKU déjà existant |
| `PAYMENT_001` | Payment failed | Paiement échoué |
| `PAYMENT_002` | Insufficient funds | Fonds insuffisants |
| `SERVER_001` | Internal server error | Erreur serveur interne |
| `VALIDATION_001` | Invalid input data | Données d'entrée invalides |

---

## Webhooks & Notifications

### Configuration Webhook
```
POST /webhooks/configure
```

**Request Body:**
```json
{
  "url": "https://api.reats-cookers.com/webhooks",
  "events": ["order.created", "order.status_changed", "document.approved"],
  "secret": "webhook_secret_key"
}
```

### Événements Disponibles

#### order.created
```json
{
  "event": "order.created",
  "timestamp": "2025-12-01T10:30:00.000Z",
  "data": {
    "orderId": "order_123",
    "orderNumber": "#1234",
    "total": 51.52
  }
}
```

#### order.status_changed
```json
{
  "event": "order.status_changed",
  "timestamp": "2024-12-01T10:35:00.000Z",
  "data": {
    "orderId": "order_123",
    "previousStatus": "pending",
    "newStatus": "preparing"
  }
}
```

#### document.approved
```json
{
  "event": "document.approved",
  "timestamp": "2024-12-01T10:40:00.000Z",
  "data": {
    "userId": "user_123",
    "documentType": "hygiene_certificate",
    "documentId": "doc_abc123"
  }
}
```
---

**Fin de la documentation**

Chancel Dave Glad