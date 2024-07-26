package de.trion.calculatorbackend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Database representation

@Repository
public interface CalculationRepository extends JpaRepository<CalculationRequest, Long> {
}