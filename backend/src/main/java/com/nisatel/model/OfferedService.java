package com.nisatel.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class OfferedService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    @Column(length = 2000)
    private String[] features;

    private String imageUrl;

    private String shape; // par exemple: "circle", "rounded", "hexagon"

    @Column(name = "order_index")
    private Integer orderIndex;
}
